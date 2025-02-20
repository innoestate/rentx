// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import { User } from './models/user.model';

// Removed the beforeEach hook to allow adding it directly in spec files

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Login with a google refresh token.
       * Read cypress.readme.md for more information. 
       */
      loginByGoogleApi(): Chainable<void>;
      preparDb(): Chainable<void>;
      login(user: User): Chainable<void>;
    }
  }
}