
export const IsButtonEnabled = () => {
  cy.get('[test-selector="ui-popup-validation-button"]')
    .find('button').should('not.have.attr', 'disabled');
}

export const IsButtonDisabled = () => {
  cy.get('[test-selector="ui-popup-validation-button"]')
    .find('button').should('have.attr', 'disabled');
}