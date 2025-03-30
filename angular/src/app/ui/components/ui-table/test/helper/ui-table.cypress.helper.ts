import { UiTableColumnItem } from "src/app/ui/components/ui-table/models/ui-table.column.model";

export const HasRow = (rowI: number) => {
  cy.get('[test-selector="ui-table-row-' + rowI + '"]').should('exist');
}

export const HasNoRow = (rowI: number) => {
  cy.get('[test-selector="ui-table-row-' + rowI + '"]').should('not.exist');
}

export const testEditableFields = (columnsModel: UiTableColumnItem[], row_index = 0) => {
  columnsModel.forEach((column, index) => {
    if(column.editable && column.type === 'text') {
      testEditableStringField(row_index, index);
    }else if (column.editable && column.type === 'number') {
      testEditableNumberField(row_index, index);
    }
  })
}

const testEditableStringField = (row_index: number, column_index: number) => {
  cy.get('[test-selector="ui-table-cell-c' + column_index + '-r' + row_index + '"]').children().find('[test-selector="ui-table-editable-value"]').should('be.visible');
  cy.get('[test-selector="ui-table-cell-c' + column_index + '-r' + row_index + '"]').children().find('[test-selector="ui-table-editable-value"]').click();
  cy.get('[test-selector="ui-table-cell-c' + column_index + '-r' + row_index + '"]').children().find('[test-selector="ui-table-editable-input"]').clear();
  cy.get('[test-selector="ui-table-cell-c' + column_index + '-r' + row_index + '"]').children().find('[test-selector="ui-table-editable-input"]').type('1 street 12345');
  cy.get('[test-selector="ui-table-cell-c' + column_index + '-r' + row_index + '"]').children().find('[test-selector="ui-table-editable-input"]').focus().blur();
  cy.get('[test-selector="ui-table-cell-c' + column_index + '-r' + row_index + '"]').children().find('[test-selector="ui-table-editable-value"]').should('have.text', '1 street 12345');
}

const testEditableNumberField = (row_index: number, column_index: number) => {
  cy.get('[test-selector="ui-table-cell-c' + column_index + '-r' + row_index + '"]').children().find('[test-selector="ui-table-editable-value"]').should('be.visible');
  cy.get('[test-selector="ui-table-cell-c' + column_index + '-r' + row_index + '"]').children().find('[test-selector="ui-table-editable-value"]').click();
  cy.get('[test-selector="ui-table-cell-c' + column_index + '-r' + row_index + '"]').children().find('[test-selector="ui-table-editable-input"]').clear();
  cy.get('[test-selector="ui-table-cell-c' + column_index + '-r' + row_index + '"]').children().find('[test-selector="ui-table-editable-input"]').type('2');
  cy.get('[test-selector="ui-table-cell-c' + column_index + '-r' + row_index + '"]').children().find('[test-selector="ui-table-editable-input"]').focus().blur();
  cy.get('[test-selector="ui-table-cell-c' + column_index + '-r' + row_index + '"]').children().find('[test-selector="ui-table-editable-value"]').should('have.text', '2');
}