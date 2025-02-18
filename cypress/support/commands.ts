/// <reference types="cypress" />

import { johnDoe } from "./mocks/user.mock";
import { getGoogleAccessToken, getGoogleLoginUserInfos, getRentxAccessToken, setRentxTokenToLocalStorage } from "./utils/commands.login.goole.utils";
import { resetDb } from "./utils/commands.db.utils";

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('preparDb', () => {
    resetDb();
})

Cypress.Commands.add('login', () => {
    getRentxAccessToken({user: johnDoe}).then(({ rentxToken }) => {
        setRentxTokenToLocalStorage(rentxToken);
    })
})

// Read cypress.readme.md for more information (need to create a refresh token & more)
Cypress.Commands.add('loginByGoogleApi', () => {

    getGoogleAccessToken().then(({ access_token }) => {
        getGoogleLoginUserInfos(access_token).then((googleLoginUserInfo) => {
            getRentxAccessToken(googleLoginUserInfo).then(({ rentxToken }) => {

                setRentxTokenToLocalStorage(rentxToken);

            })
        })
    })
})

