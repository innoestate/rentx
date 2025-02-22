import { johnDoe } from "../support/mocks/user.mock"

describe('estate page', function () {

  beforeEach(function () {
    cy.preparDb()
    cy.login(johnDoe)
  })

  it('add estate from main menu', function () {
    cy.get('[test-selector="add-estate-main-button"]').click()
    cy.get('[data-cy="create-estate-form"]').should('be.visible'); // Ensure modal is visible before interacting
    cy.get('[data-cy="create-estate-street"]').focus().type('123 Main St')
    cy.get('[data-cy="create-estate-city"]').focus().type('Anytown')
    cy.get('[data-cy="create-estate-zip"]').focus().type('12345')
    cy.get('[data-cy="create-estate-plot"]').focus().type('1A')
    cy.get('[test-selector="create-estate-submit"]').click()
    cy.get('.anticon-close').click()
    cy.get('[data-cy="estate-owner-cell"]').should('be.visible')
    cy.get('[data-cy="estate-owner-cell"]').invoke('text').should('eq', johnDoe.firstName + ' ' + johnDoe.lastName)
  })

})