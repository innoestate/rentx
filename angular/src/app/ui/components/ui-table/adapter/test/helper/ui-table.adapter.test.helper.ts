import { isEqual } from "lodash";
import { UiDropdownItem } from "src/app/ui/components/ui-dropdown/model/ui-dropdown-item.model";
import { UiTableAdapter } from "../../ui-table.adapter";

/**
 * UiTableAdapterTestHelper provide tests for UiTableAdapter implementation.
 * It's testing that the adapter build a correct table from data considering columns and rows matching together.
 */
export class UiTableAdapterTestHelper {

  buildArguments: any;

  constructor(private uiTableAdapter: UiTableAdapter, ...args: any) {
    this.buildArguments = args;
  }

  testTable() {
    this.testRowsMatching();
    this.testDropdownMatching();
  }

  private testRowsMatching() {
    const table = this.uiTableAdapter.buildTable(...this.buildArguments);
    expect(Object.keys(table.rows[0].cells!).length).toEqual(table.columns.length)
  }

  private testDropdownMatching() {
    const table = this.uiTableAdapter.buildTable(...this.buildArguments);
    table.columns.forEach((column) => {
      if (column.dropDownItems) {
        table.rows.forEach(row => {
          const cell = row.cells![column.key] as UiDropdownItem<any>;
          if (cell?.value && cell?.value !== '') {
            const existingItemInDrodDown = column.dropDownItems!.find(item => isEqual(item.value, cell.value));
            expect(existingItemInDrodDown).toBeTruthy();
          } else if (cell?.value === '') {
            expect(cell.value).toEqual('');
          }else{
            expect(cell.value).toBeFalsy();
          }
        })
      }
    })
  }

}