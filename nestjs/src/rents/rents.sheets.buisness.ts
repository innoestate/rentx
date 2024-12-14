import { google, sheets_v4 } from 'googleapis';
import { Estate_Db } from '../estates/estate-db.model';
import { Lodger_Db } from '../lodgers/lodger-db.model';
import { Owner_Db } from '../owners/owners-db.model';
import { Estate_filled_Db } from '../estates/estate-filled-db.model';
import { end } from 'pdfkit';
import { getRentReceiptInfos } from './rent-receipts.business';

export const createSheet = async (estates: Estate_Db[], owners: Owner_Db[], lodgers: Lodger_Db[], accessToken: string, refreshToken: string, clientId: string, clientSecret: string): Promise<any> => {

    const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
    oauth2Client.setCredentials({
        access_token: accessToken,
        refresh_token: refreshToken,
    });
    const sheets = google.sheets('v4');

    try {
        const request = {
            resource: {
                properties: {
                    title: 'immobilier_gestion_' + new Date().getFullYear(),
                },
            },
            auth: oauth2Client,
        };

        await refreshTokenFunction(oauth2Client);
        const response = await sheets.spreadsheets.create(request);
        console.log('Spreadsheet ID:', response.data.spreadsheetId);
        const updateResponse = await fillSheet(estates, owners, lodgers, oauth2Client, response.data.spreadsheetId);
        return updateResponse;
    } catch (error) {
        console.error('Error creating the Google Sheet:', error);
    }
}

export const getOath2Client = async (accessToken: string, refreshToken: string, clientId: string, clientSecret: string) => {
    const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
    oauth2Client.setCredentials({
        access_token: accessToken,
        refresh_token: refreshToken,
    });
    await refreshTokenFunction(oauth2Client);
    return oauth2Client;
}

export const createNewSheet = async (oauth2Client): Promise<any> => {
    const sheets = google.sheets('v4');
    try {
        const request = {
            resource: {
                properties: {
                    title: 'immobilier_gestion_' + new Date().getFullYear(),
                },
            },
            auth: oauth2Client,
        };
        const response = await sheets.spreadsheets.create(request);
        return response.data.spreadsheetId;
    } catch (error) {
        console.error('Error creating the Google Sheet:', error);
    }
}

const refreshTokenFunction = async (oauth2Client) => {
    console.log('refresh token');
    await oauth2Client.refreshAccessToken().then(tokens => {
        oauth2Client.setCredentials(tokens.credentials);
        return tokens.credentials.access_token;
    })
};

export const fillSheet = async (estates: Estate_Db[], owners: Owner_Db[], lodgers: Lodger_Db[], oauth2Client, spreadsheetId: string) => {
    const sheets = google.sheets('v4');
    const sheetId = 0;
    const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    const requests: sheets_v4.Schema$Request[] = [
        {
            updateSheetProperties: {
                properties: {
                    sheetId: sheetId,
                    title: 'Biens',
                },
                fields: 'title',
            }
        },
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
                            ...months.map(month => ({ userEnteredValue: { stringValue: month }, userEnteredFormat: { backgroundColor: { red: 0.9, green: 0.9, blue: 0.9 } } })),
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
                                { userEnteredValue: { stringValue: owners.find(owner => owner.id === estate.owner_id)?.name ?? '' } },
                                { userEnteredValue: { stringValue: estate.street } },
                                { userEnteredValue: { stringValue: estate.city } },
                                { userEnteredValue: { stringValue: estate.plot ?? '' } },
                                { userEnteredValue: { stringValue: lodgers.find(lodger => lodger.id === estate.lodger_id)?.name ?? '' } },
                                ...months.map(month => ({ userEnteredValue: { stringValue: '' } })),
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

    return await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
            requests,
        },
        auth: oauth2Client,
    });

}

export const setRentInSheet = async (oauth2Client, spreadsheetId: string, estate: Estate_filled_Db, startDate_, endDate_) => {
    const sheets = google.sheets('v4');

    const { startDate, endDate, rent, charges } = getRentReceiptInfos(estate, estate.owner, estate.lodger, startDate_, endDate_);


    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: 'Biens',
            auth: oauth2Client,
        });

        const rows = response.data.values;

        console.log('rows:', rows);

        const cellUpdates = getCellsUpdates(rows, estate, startDate, endDate, rent + charges);

        const batchUpdateRequest = {
            requests: cellUpdates.map(update => ({
                updateCells: {
                    rows: [
                        {
                            values: [
                                {
                                    userEnteredValue: { numberValue: update.fullRent },
                                    userEnteredFormat: {
                                        backgroundColor: {
                                            red: 0.0,
                                            green: 1.0,
                                            blue: 0.0,
                                        },
                                    },
                                },
                            ],
                        },
                    ],
                    fields: 'userEnteredValue,userEnteredFormat.backgroundColor',
                    range: {
                        sheetId: 0,
                        startRowIndex: update.row,
                        endRowIndex: update.row + 1,
                        startColumnIndex: update.column,
                        endColumnIndex: update.column + 1,
                    },
                },
            })),
        };

        await sheets.spreadsheets.batchUpdate({
            spreadsheetId,
            auth: oauth2Client,
            requestBody: batchUpdateRequest,
        });

    } catch (error) {
        console.error('Error reading the Google Sheet:', error);
    }
}

export const getCellsUpdates = (rows: any[], estate: Estate_filled_Db, startDate: Date, endDate: Date, totalRent: number): { column: number, row: number, cell: string, fullRent: number }[] => {

    let targetRow = 0;
    rows.forEach((row, index) => {
        if (row[1] === estate.street && row[2] === estate.city) {
            targetRow = index;
        }
    });
    const targetColumn = 5 + new Date(startDate).getMonth();
    const columnLetter = String.fromCharCode(65 + targetColumn);
    const targetCell = `${columnLetter}${targetRow + 1}`;


    return [{ column: targetColumn, row: targetRow, cell: targetCell, fullRent: totalRent }];
}