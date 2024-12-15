import { Estate_filled_Db } from "src/estates/estate-filled-db.model";
import { Sheet, SpreadSheet } from "./rents.spreadsheet.buisness";
import { SpreadSheetStrategy } from "./spreadsheets.strategy";
import { google, sheets_v4 } from 'googleapis';

const MONTHS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

export const getOath2Client = async (accessToken: string, refreshToken: string, clientId: string, clientSecret: string) => {
    const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
    oauth2Client.setCredentials({
        access_token: accessToken,
        refresh_token: refreshToken,
    });
    await refreshTokenFunction(oauth2Client);
    return oauth2Client;
}

const refreshTokenFunction = async (oauth2Client) => {
    console.log('refresh token');
    await oauth2Client.refreshAccessToken().then(tokens => {
        oauth2Client.setCredentials(tokens.credentials);
        return tokens.credentials.access_token;
    })
};


export class SpreadSheetGoogleStrategy extends SpreadSheetStrategy {
    
    oauth2Client: any;
    sheets: sheets_v4.Sheets;

    constructor(ccessToken: string, refreshToken: string, clientId: string, clientSecret: string){
        super();
        this.oauth2Client = getOath2Client(ccessToken, refreshToken, clientId, clientSecret);
        this.sheets = google.sheets('v4');
    }
    
    async getSpreadSheet(id: string): Promise<SpreadSheet> {
        try {
            const response = await this.sheets.spreadsheets.get({
                spreadsheetId: id,
                auth: this.oauth2Client,
            });
            const ranges = await response.data.sheets;
            return {
                id: response.data.spreadsheetId,
                title: response.data.properties.title,
                sheets: ranges.map(range => {
                    return {
                        sheetId: range.properties.sheetId,
                        title: range.properties.title,
                        rows: range.data[range.properties.sheetId].rowData.map(rows => rows.values.map( row  => {
                            return {
                                value: row.formattedValue,
                                // backgroundColor: row.effectiveFormat?.backgroundColor,
                            }
                        })),
                    }
                }),
            }
        } catch (error) {
            console.error('Error getting the Google SpreadSheets', error);
        }
        return null;
    }

    async createSpreadSheet(title: string): Promise<SpreadSheet> {
        try {
            const request = {
                resource: {
                    properties: {
                        title,
                    },
                },
                auth: this.oauth2Client,
            };
            const response = await this.sheets.spreadsheets.create(request);
            return {
                id: response.data.spreadsheetId,
                title,
                sheets: [],
            }
        } catch (error) {
            console.error('Error creating the Google Sheet:', error);
        }
        return null;
    }

    async addSheet(id: string, title: string, estates: Estate_filled_Db[]): Promise<SpreadSheet> {

        const response = await this.sheets.spreadsheets.get({
            spreadsheetId: id,
            auth: this.oauth2Client,
        });
        const ranges = await response.data.sheets;
        const sheetId = ranges.reduce((acc, sheet) => Math.max(acc, sheet.properties.sheetId), 0);
    
        let sheetProperty = {}
        if(sheetId === 0 ){
            sheetProperty = {
                updateSheetProperties: {
                    properties: {
                        sheetId: sheetId,
                        title,
                    },
                    fields: 'title',
                }
            };
        }else{
            sheetProperty = {
                addSheet: {
                    properties: {
                        sheetId: sheetId,
                        title,
                    },
                }
            };
        }

        const requests: sheets_v4.Schema$Request[] = [
            sheetProperty,
            {
                updateCells: {
                    rows: [
                        {
                            values: [
                                { userEnteredValue: { stringValue: 'Propriétaire' }, userEnteredFormat: { backgroundColor: { red: 0.9, green: 0.9, blue: 0.9 } } },
                                { userEnteredValue: { stringValue: 'Adresse' }, userEnteredFormat: { backgroundColor: { red: 0.9, green: 0.9, blue: 0.9 } } },
                                { userEnteredValue: { stringValue: 'Ville' }, userEnteredFormat: { backgroundColor: { red: 0.9, green: 0.9, blue: 0.9 }, } },
                                { userEnteredValue: { stringValue: 'Lot' }, userEnteredFormat: { backgroundColor: { red: 0.9, green: 0.9, blue: 0.9 } } },
                                { userEnteredValue: { stringValue: 'Locataire' }, userEnteredFormat: { backgroundColor: { red: 0.9, green: 0.9, blue: 0.9 } } },
                                ...MONTHS.map(month => ({ userEnteredValue: { stringValue: month }, userEnteredFormat: { backgroundColor: { red: 0.9, green: 0.9, blue: 0.9 } } })),
                            ],
                        },
                    ],
                    fields: '*',
                    start: { sheetId, rowIndex: 0, columnIndex: 0 },
                },
            },
            {
                appendCells: {
                    rows: [
                        ...estates.map(estate => (
                            {
                                values: [
                                    { userEnteredValue: { stringValue: estate.owner?.name ?? '' } },
                                    { userEnteredValue: { stringValue: estate.street } },
                                    { userEnteredValue: { stringValue: estate.city } },
                                    { userEnteredValue: { stringValue: estate.plot ?? '' } },
                                    { userEnteredValue: { stringValue: estate.lodger?.name ?? '' } },
                                    ...MONTHS.map(month => ({ userEnteredValue: { stringValue: '' } })),
                                ],
                            })),
                    ],
                    fields: '*',
                    sheetId,
                },
            },
            {
                updateSheetProperties: {
                    properties: {
                        sheetId: sheetId,
                        gridProperties: {
                            frozenRowCount: 1, // Freeze the first row
                        },
                    },
                    fields: 'gridProperties.frozenRowCount',
                },
            },
            {
                updateDimensionProperties: {
                    range: {
                        sheetId: sheetId,
                        dimension: 'COLUMNS',
                        startIndex: 1,
                        endIndex: 2,
                    },
                    properties: {
                        pixelSize: 300,
                    },
                    fields: 'pixelSize',
                },
            }
        ];
    
        await this.sheets.spreadsheets.batchUpdate({
            spreadsheetId: id,
            requestBody: {
                requests,
            },
            auth: this.oauth2Client,
        });

        return await this.getSpreadSheet(id);
    }

    async addSheets(id: string, titles: string[], estates: Estate_filled_Db[]): Promise<SpreadSheet> {

        while (titles.length) {
            const title = titles.pop();
            await this.addSheet(id, title, estates);
        }

        return await this.getSpreadSheet(id);
    }

    async addRowsInSheet(id: string, title: string, estates: Estate_filled_Db[]): Promise<SpreadSheet> {

        const response = await this.sheets.spreadsheets.get({
            spreadsheetId: id,
            auth: this.oauth2Client,
        });
        const ranges = await response.data.sheets;
        const sheetId = ranges.find(sheet => sheet.properties.title === title).properties.sheetId;
        if(!sheetId) throw new Error('Sheet not found');

        const requests: sheets_v4.Schema$Request[] = [
            {
                appendCells: {
                    rows: [
                        ...estates.map(estate => (
                            {
                                values: [
                                    { userEnteredValue: { stringValue: estate.owner?.name ?? '' } },
                                    { userEnteredValue: { stringValue: estate.street } },
                                    { userEnteredValue: { stringValue: estate.city } },
                                    { userEnteredValue: { stringValue: estate.plot ?? '' } },
                                    { userEnteredValue: { stringValue: estate.lodger?.name ?? '' } },
                                    ...MONTHS.map(month => ({ userEnteredValue: { stringValue: '' } })),
                                ],
                            })),
                    ],
                    fields: '*',
                    sheetId,
                },
            }
        ];
    
        await this.sheets.spreadsheets.batchUpdate({
            spreadsheetId: id,
            requestBody: {
                requests,
            },
            auth: this.oauth2Client,
        });

        return await this.getSpreadSheet(id);
    }

    async removeRowsInSheet(id: string, title: string, rowIdentifier: {street: string | number, city: string | number}[]): Promise<SpreadSheet> {


        const response = await this.sheets.spreadsheets.get({
            spreadsheetId: id,
            auth: this.oauth2Client,
        });
        const ranges = await response.data.sheets;
        const sheetId = ranges.reduce((acc, sheet) => Math.max(acc, sheet.properties.sheetId), 0);
        
        const rows = response.data.sheets.find(sheet => sheet.properties.title === title)?.data?.values??[];

        const headers = rows[0]; // Assuming the first row is the header
        const addressIndex = headers.indexOf('adresse');
        const cityIndex = headers.indexOf('ville');
    
        if (addressIndex === -1 || cityIndex === -1) {
          console.error("Required columns ('adresse' or 'ville') not found.");
          throw new Error("Required columns ('adresse' or 'ville') not found.");
        }
    
        // Step 3: Find rows that match the criteria
        const matchingIndexes = [];
        for (let i = 1; i < rows.length; i++) { // Start at 1 to skip headers
          const row = rows[i];
          const address = row[addressIndex];
          const city = row[cityIndex];
    
          if (
            rowIdentifier.some(
              (criteria) =>
                criteria.street === address && criteria.city === city
            )
          ) {
            matchingIndexes.push(i); // Store the 0-based index of the row
          }
        }


        const requests: sheets_v4.Schema$Request[] = matchingIndexes.reduce((acc, rowIndex) => ([
            ...acc,
            {
                deleteDimension: {
                    range: {
                      sheetId: sheetId, // The ID of the sheet/tab
                      dimension: 'ROWS', // We're deleting a row
                      startIndex: rowIndex, // The 0-based index of the row to delete
                      endIndex: rowIndex + 1, // Delete only this one row
                    },
                  },
            },
        ]), []);
    
        await this.sheets.spreadsheets.batchUpdate({
            spreadsheetId: id,
            requestBody: {
                requests,
            },
            auth: this.oauth2Client,
        });


        return null;
    }

    async getSheets(id: string): Promise<Sheet[]> {
        const spreadsheet = await this.getSpreadSheet(id);
        return spreadsheet.sheets;
    }

    // async updateSheets(sheets: Sheet[]): Promise<SpreadSheet> {
    //     return null;
    // }
}