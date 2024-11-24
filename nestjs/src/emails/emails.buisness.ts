import { google } from 'googleapis';
import { from } from 'rxjs';

export const sendEmail = (access_token: string, refresh_token: string, email: string) => {

    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({
        access_token,
        refresh_token,
    });
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
    const request = {
        userId: 'me',
        resource: {
            raw: email
        }
    };
    return from(gmail.users.messages.send(request));
}