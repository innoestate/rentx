import { johnDoe } from "../support/mocks/user.mock"

describe('estate page', function () {

  beforeEach(function () {
    cy.preparDb()
    cy.login(johnDoe)
  })

  it('add estate from main menu', function () {
    cy.get('[test-selector="add-estate-main-button"]').click()
    cy.get('[test-selector="create-estate-form"]').should('be.visible'); // Ensure modal is visible before interacting
    cy.get('[test-selector="create-estate-street"]').focus().type('123 Main St')
    cy.get('[test-selector="create-estate-city"]').focus().type('Anytown')
    cy.get('[test-selector="create-estate-zip"]').focus().type('12345')
    cy.get('[test-selector="create-estate-plot"]').focus().type('1A')
    cy.get('[test-selector="create-estate-submit"]').click()
    cy.get('[test-selector="ux-popup-close-icon"]').click()
    cy.get('[test-selector="estate-owner-cell"]').should('be.visible')
    cy.get('[test-selector="estate-owner-cell"]').invoke('text').should('eq', johnDoe.firstName + ' ' + johnDoe.lastName)
  })

})