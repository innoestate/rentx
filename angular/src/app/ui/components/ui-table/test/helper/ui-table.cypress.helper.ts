export const HasRow = (rowI: number) => {
  cy.get('[test-selector="ui-table-row-' + rowI + '"]').should('exist');
}

export const HasNoRow = (rowI: number) => {
  cy.get('[test-selector="ui-table-row-' + rowI + '"]').should('not.exist');
}