import { environment } from "../../../angular/src/environments/environment";

export const getGoogleAccessToken = () => {
    return cy.request(GET_GOOGLE_ACCESS_TOKEN_REQUEST).its('body');
}

export const getGoogleLoginUserInfos = (accessToken: string) => {
    return cy.request(getGoogleUserInfoRequest(accessToken)).its('body').then((body: any) => {

        const user = {
            googleId: body.sub,
            email: body.email ?? '',
            firstName: body.given_name ?? '',
            lastName: body.family_name ?? '',
            picture: body.picture ?? '',
            accessToken: accessToken ?? '',
            refresh_token: Cypress.env('googleRefreshToken'),
        }

        return { user };
    });
}

export const getRentxAccessToken = (googleLoginUserInfos: any) => {
    return cy.request(getRentxAccessTokenRequest(googleLoginUserInfos)).its('body').then((body: any) => ({ rentxToken: body?.token }))
}

export const setRentxTokenToLocalStorage = (rentxToken: string) => {

    cy.visit(environment.baseUrl); 

    cy.window().then((window) => {
        window.localStorage.setItem('authToken', rentxToken);
    });

    cy.visit(environment.baseUrl); 

}


const getGoogleUserInfoRequest = (accessToken: string) => ({
    method: 'GET',
    url: 'https://www.googleapis.com/oauth2/v3/userinfo',
    headers: { Authorization: `Bearer ${accessToken}` },
})

const getRentxAccessTokenRequest = (googleLoginUserInfos: any) => ({
    method: 'POST',
    url: `${environment.apiURL}/auth/google/dev/login`,
    body: googleLoginUserInfos,
})

const GET_GOOGLE_ACCESS_TOKEN_REQUEST = {
    method: 'POST',
    url: 'https://www.googleapis.com/oauth2/v4/token',
    body: {
        grant_type: 'refresh_token',
        client_id: Cypress.env('googleClientId'),
        client_secret: Cypress.env('googleClientSecret'),
        refresh_token: Cypress.env('googleRefreshToken'),
    },
}