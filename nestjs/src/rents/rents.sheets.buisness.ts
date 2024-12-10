import { google } from 'googleapis';

export const createSheet = async (accessToken: string, refreshToken: string, clientId: string, clientSecret: string): Promise<void> => {

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
                    title: 'titleTestFromRentX',
                },
            },
            auth: oauth2Client,
        };

        const response = await sheets.spreadsheets.create(request);
        console.log('Spreadsheet ID:', response.data.spreadsheetId);
    } catch (error) {
        console.error('Error creating the Google Sheet:', error);
    }
}