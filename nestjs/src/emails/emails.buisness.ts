import { google } from 'googleapis';
import { catchError, from, of, switchMap, throwError } from 'rxjs';

export const sendEmail = (accessToken: string, refreshToken: string, email: string) => {

    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({
        access_token: accessToken,
        refresh_token: refreshToken,
    });
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    const sendEmailRequest = () => {
        const request = {
            userId: 'me',
            resource: {
                raw: email,
            },
        };
        return from(gmail.users.messages.send(request));
    };

    const refreshTokenFunction = () =>
        from(
            oauth2Client.refreshAccessToken().then(tokens => {
                oauth2Client.setCredentials(tokens.credentials);
                return tokens.credentials.access_token;
            })
        );

    let tokenRefreshed = false;

    return sendEmailRequest().pipe(
        catchError(err => {
            if ((err.code === 401 || err.message.includes('invalid_grant')) && !tokenRefreshed) {
                tokenRefreshed = true;
                return refreshTokenFunction().pipe(
                    switchMap(() => sendEmailRequest()) 
                );
            }
            return throwError(() => err);
        })
    )
}