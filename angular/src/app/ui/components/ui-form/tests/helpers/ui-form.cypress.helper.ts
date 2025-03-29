export const TypeTextInput = (field: string, text: string) => {
  cy.get('[test-selector="ui-form-input-' + field + '"]').focus().type(text);
  cy.get('[test-selector="ui-form-input-' + field + '"]').should('have.value', text);
}