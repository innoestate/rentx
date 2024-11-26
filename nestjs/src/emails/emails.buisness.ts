import { google } from 'googleapis';
import { catchError, from, switchMap, tap, throwError } from 'rxjs';

export const sendEmail = (accessToken: string, refreshToken: string, email: string, clientId: string, clientSecret: string) => {

    const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
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

    const refreshTokenFunction = () => {
        console.log('refresh token', refreshToken);
        return from(
            oauth2Client.refreshAccessToken().then(tokens => {
                oauth2Client.setCredentials(tokens.credentials);
                return tokens.credentials.access_token;
            })
        ).pipe(
            catchError(err => {
                console.log('fail refreshing token');
                console.error(err);
                return throwError(() => err);
            })
        )
    };

    let tokenRefreshed = false;

    return sendEmailRequest().pipe(
        catchError(err => {
            console.log('fail sending email');
            console.error(err);
            if (!tokenRefreshed) {
                tokenRefreshed = true;
                return refreshTokenFunction().pipe(
                    tap(() => console.log('token refreshed')),
                    switchMap(() => sendEmailRequest()) 
                );
            }
            return throwError(() => err);
        })
    )
}