export const ClickOnValidate = () => {
  cy.get('[test-selector="ui-popup-validation-button"]').click();
}

export const ClosePopup = () => {
  cy.get('.ant-modal-close-icon').click();
}