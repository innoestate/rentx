import { Injectable } from "@angular/core";
import { Estate } from "src/app/core/models/estate.model";
import { Owner } from "src/app/core/models/owner.model";
import { UiDropdownItem } from "src/app/ui/components/ui-dropdown/model/ui-dropdown-item.model";
import { UiTableRow } from "src/app/ui/components/ui-table/models/ui-table-row.model";
import { UiTableColumnItem } from "src/app/ui/components/ui-table/models/ui-table.column.model";
import { EstatesCommandsProvider } from "../../commands/estates.commands.provider";
import { estatesColumnItems } from "./estates.table.columns";
import { difference, differenceWith, isEqual } from "lodash";

@Injectable({
  providedIn: 'root'
})
export class EstatesUiTableAdapter {

  columns: UiTableColumnItem[] = [];

  constructor(private estatesCommands: EstatesCommandsProvider) { }

  buildTableList(estates: Estate[], owners: Owner[]): { columns: UiTableColumnItem[], rows: UiTableRow[] } {

    const ownersDropDown = this.createOwnerDropdownItems(owners);

    this.columns = this.createColumns(estatesColumnItems, [{ key: 'owner', items: ownersDropDown }]);

    return {
      columns: this.columns,
      rows: this.createRows(estates)
    };
  }

  createColumns(columnItems: UiTableColumnItem[], dropDowns: { key: string, items: UiDropdownItem<any>[] }[]): UiTableColumnItem[] {
    return columnItems.map(column => {
      const dropDown = dropDowns.find(dropDown => dropDown.key === column.key);
      return {
        ...column,
        dropDownItems: dropDown ? dropDown.items : undefined
      };
    });
  }

  extractEstateFromRow(estates: Estate[], row: UiTableRow): Estate {
    const estate = estates.find(estate => estate.id === row['id']);
    if (!estate) throw new Error('Estate not matching with table row');

    const updatedFields = this.updatableFields();

    const actualEstateFields: Record<string, any> = {};
    const updatedEstateFields: Record<string, any> = {};

    updatedFields.forEach(key => {
      actualEstateFields[key] = (estate as any)[key];
      if (!isEqual(actualEstateFields[key], row[key])) {
        updatedEstateFields[key] = row[key];
      }
    });

    // const changedKeys = differenceWith(Object.keys(updatedFields), Object.keys(row), (a, b) => isEqual((estate as any)[a], row[b]));
    console.log('updatedEstateFields', updatedEstateFields);
    // console.log('changes', changedKeys.map(key => row[key]));

    if (!estate) throw new Error('Estate not matching with table row');
    return {
      ...estate
    }
  }

  private updatableFields(): string[] {
    return this.columns.reduce((acc, column) => {
      if (column.dropDownItems || column.editable) acc.push(column.key);
      return acc;
    }, [] as string[]);
  }

  private createOwnerDropdownItems(owners: Owner[]): UiDropdownItem<any>[] {
    const ownersDropdownItems: UiDropdownItem<any>[] = owners.map(owner => ({ target: owner.id, label: owner.name }));
    ownersDropdownItems.push({
      target: 'new', label: 'créer un nouveau', command: () => this.estatesCommands.createEstate()
    })
    return ownersDropdownItems;
  }

  private createRows(estates: Estate[]): UiTableRow[] {
    return estates.map(estate => this.formatUiTableRow(estate));
  }

  private formatUiTableRow(estate: Estate): UiTableRow {
    return {
      id: estate.id,
      address: estate.street + ' ' + estate.city + ' ' + estate.zip,
      plot: estate.plot ?? '',
      rent: estate.rent ?? 0,
      charges: estate.charges ?? 0,
      owner: ({ label: estate.owner?.name, target: estate.owner?.id } as any),
      lodger: estate.lodger?.name ?? '',
      actions: ({
        icon: 'delete', label: '', command: () => {
          // this.estatesData.remove(estate.id)
        }
      } as any)
    }
  }

}
