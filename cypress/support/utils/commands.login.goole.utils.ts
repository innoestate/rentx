import { environment } from "../../../angular/src/environments/environment";
import { User } from "../models/user.model";

export const getGoogleAccessToken = () => {
    return cy.request({
        method: 'POST',
        url: 'https://www.googleapis.com/oauth2/v4/token',
        body: {
            grant_type: 'refresh_token',
            client_id: Cypress.env('googleClientId'),
            client_secret: Cypress.env('googleClientSecret'),
            refresh_token: Cypress.env('googleRefreshToken'),
        },
    }).its('body');
}

export const getGoogleLoginUserInfos = (accessToken: string) => {
    return cy.request({
        method: 'GET',
        url: 'https://www.googleapis.com/oauth2/v3/userinfo',
        headers: { Authorization: `Bearer ${accessToken}` },
    }).its('body').then((body: any) => {
        return {
            googleId: body.sub,
            email: body.email ?? '',
            firstName: body.given_name ?? '',
            lastName: body.family_name ?? '',
            picture: body.picture ?? '',
            accessToken: accessToken ?? '',
            refresh_token: Cypress.env('googleRefreshToken'),
        }
    });
}

export const getRentxAccessToken = (loginUserInfos: User) => {
    return cy.request({
        method: 'POST',
        url: `${environment.apiURL}/auth/google/dev/login`,
        body: { user: loginUserInfos },
    }).its('body').then((body: any) => ({ rentxToken: body?.token }))
}

export const setRentxTokenToLocalStorage = (rentxToken: string) => {

    cy.visit(environment.baseUrl);

    cy.window().then((window) => {
        window.localStorage.setItem('authToken', rentxToken);
    });

    cy.visit(environment.baseUrl);

}