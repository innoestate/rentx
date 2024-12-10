import { google, sheets_v4 } from 'googleapis';
import { Estate_Db } from 'src/estates/estate-db.model';
import { Lodger_Db } from 'src/lodgers/lodger-db.model';
import { Owner_Db } from 'src/owners/owners-db.model';

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
        const updateResponse = await createEstatesSheet(estates, owners, lodgers, oauth2Client, sheets, response.data.spreadsheetId);
        return updateResponse;
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

const createEstatesSheet = async (estates: Estate_Db[], owners: Owner_Db[], lodgers: Lodger_Db[], oauth2Client, sheets: sheets_v4.Sheets, spreadsheetId: string) => {
    const sheetId = 0;

    const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    const estatesAppender: any = {
        appendCells: {
            rows: [
                ...estates.map(estate => (
                    {
                        values: [
                            { userEnteredValue: { stringValue: owners.find(owner => owner.id === estate.owner_id)?.name ?? '' } },
                            { userEnteredValue: { stringValue: estate.street } },
                            { userEnteredValue: { stringValue: estate.plot ?? '' } },
                            { userEnteredValue: { stringValue: lodgers.find(lodger => lodger.id === estate.lodger_id)?.name ?? '' } },
                            ...months.map(month => ({ userEnteredValue: { stringValue: '' } })),
                        ],
                    })),
            ]
        }
    };

    const requests: sheets_v4.Schema$Request[] = [
        {
            updateCells: {
                rows: [
                    {
                        values: [
                            { userEnteredValue: { stringValue: 'Propriétaire' }, userEnteredFormat: { backgroundColor: { red: 0.9, green: 0.9, blue: 0.9 } } },
                            { userEnteredValue: { stringValue: 'Adresse' }, userEnteredFormat: { backgroundColor: { red: 0.9, green: 0.9, blue: 0.9 } } },
                            { userEnteredValue: { stringValue: 'Ville' }, userEnteredFormat: { backgroundColor: { red: 0.9, green: 0.9, blue: 0.9 },  } },
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
                    startIndex: 1, // First column (0-based index)
                    endIndex: 2,  // Adjust column width for columns 0-4
                },
                properties: {
                    pixelSize: 300, // Width of the columns in pixels
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