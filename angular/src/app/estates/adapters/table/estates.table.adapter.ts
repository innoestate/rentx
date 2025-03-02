import { Injectable } from "@angular/core";
import { isEqual } from "lodash";
import { Estate } from "src/app/core/models/estate.model";
import { Owner } from "src/app/core/models/owner.model";
import { UiDropdownItem } from "src/app/ui/components/ui-dropdown/model/ui-dropdown-item.model";
import { UiTableRow } from "src/app/ui/components/ui-table/models/ui-table-row.model";
import { UiTableColumnItem } from "src/app/ui/components/ui-table/models/ui-table.column.model";
import { EstatesCommandsProvider } from "../../commands/estates.commands.provider";

@Injectable({
  providedIn: 'root'
})
export class EstatesUiTableAdapter {

  columns: UiTableColumnItem[] = [];

  constructor(private estatesCommands: EstatesCommandsProvider) { }

  buildTableList(estates: Estate[], owners: Owner[]): { columns: UiTableColumnItem[], rows: UiTableRow[] } {
    return {
      columns: this.createColumns(owners),
      rows: this.createRows(estates)
    };
  }

  createColumns(owners: Owner[]): UiTableColumnItem[] {

    const ownersDropDown = this.createOwnerDropdownItems(owners);

    return [
      { key: 'address', label: 'Adresse', sort: 1 },
      { key: 'plot', label: 'lot', editable: true },
      { key: 'rent', label: 'loyer', editable: true },
      { key: 'charges', label: 'charges', editable: true },
      { key: 'owner_dropdown', label: 'propriétaire', dropDownItems: ownersDropDown, sort: 1 },
      { key: 'lodger_dropdown', label: 'locataire' },
      { key: 'actions', label: 'Actions' }
    ]
  }

  extractUpdatedFieldsFromRow(estates: Estate[], row: UiTableRow): Record<string, any> {
    const estate = estates.find(estate => estate.id === row['id']);
    if (!estate) throw new Error('Estate not matching with table row');

    const updatedFields = this.getUpdatedFields(estate, row);

    return {
      id: estate.id,
      ...updatedFields
    }
  }

  private getUpdatedFields(estate: Estate, row: UiTableRow) {

    const potentialUpdatedFiedls = {
      plot: row['plot'],
      rent: row['rent'],
      charges: row['charges'],
      owner_id: (row['owner_dropdown'] as UiDropdownItem<any>)?.value,
      // lodger_id: row['lodger'],
    }

    console.log('potentialUpdatedFiedls', potentialUpdatedFiedls)

    const actualEstateUpdatableFields = {
      plot: estate.plot,
      rent: estate.rent,
      charges: estate.charges,
      owner_id: estate.owner_id,
      // lodger_id: estate.lodger_id,
    }

    return Object.keys(potentialUpdatedFiedls).reduce((acc, key) => {
      if (!isEqual((actualEstateUpdatableFields as any)[key], (potentialUpdatedFiedls as any)[key])) {
        acc[key] = (potentialUpdatedFiedls as any)[key]
      }
      return acc
    }, {} as Record<string, any>)

  }

  private createOwnerDropdownItems(owners: Owner[]): UiDropdownItem<any>[] {
    const ownersDropdownItems: UiDropdownItem<any>[] = owners.map(owner => ({ value: owner.id, label: owner.name }));
    ownersDropdownItems.push({
      value: 'new', label: 'créer un nouveau', command: () => this.estatesCommands.createEstate()
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
      owner_dropdown: ({ label: estate.owner?.name, value: estate.owner?.id } as any),
      lodger_dropdown: estate.lodger?.name ?? '',
      actions: ({
        icon: 'delete', label: '', command: () => {
          // this.estatesData.remove(estate.id)
        }
      } as any)
    }
  }

}
