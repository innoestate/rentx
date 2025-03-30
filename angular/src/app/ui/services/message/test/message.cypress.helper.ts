export const isSuccessMessageDisplayed = (message: string) => {
  cy.get('.ant-message-success').should('be.visible');
  cy.get('.ant-message-success').should('contain', message);
}