import { Injectable } from "@angular/core";
import { isEqual } from "lodash";
import { Lodger } from "src/app/core/models/lodger.model";
import { Owner } from "src/app/core/models/owner.model";
import { UiDropdownItem } from "src/app/ui/components/ui-dropdown/model/ui-dropdown-item.model";
import { UiTableRow } from "src/app/ui/components/ui-table/models/ui-table-row.model";
import { UiTableColumnItem } from "src/app/ui/components/ui-table/models/ui-table.column.model";
import { EstatesCommandsService } from "../../commands/estates.commands.service";
import { createLodgersDropdown, createRentReceiptDropdown } from "./estates.lodgers.table.utils";
import { OwnersCommandsService } from "src/app/owners/commands/owners.command.service";
import { Estate } from "../../models/estate.model";
import { RentsCommandsService } from "src/app/rents/commands/rents.commands.service";

@Injectable({
  providedIn: 'root'
})
export class EstatesUiTableAdapter {

  columns: UiTableColumnItem[] = [];

  constructor(private estatesCommands: EstatesCommandsService, private ownersCommands: OwnersCommandsService, private rentsCommands: RentsCommandsService) {
    console.log('esate ui table adapter constructor');
  }

  buildTableList(estates: Estate[], owners: Owner[], lodgers: Lodger[]): { columns: UiTableColumnItem[], rows: UiTableRow[] } {
    return {
      columns: this.createColumns(estates,owners, lodgers),
      rows: this.createRows(estates)
    };
  }

  createColumns(estates: Estate[], owners: Owner[], lodgers: Lodger[]): UiTableColumnItem[] {

    const ownersDropDown = this.createOwnerDropdownItems(owners);
    const lodgersDropDown = this.createLodgerDropdownItems(estates, lodgers);

    return [
      { key: 'address', label: 'Adresse', sort: 1 },
      { key: 'plot', label: 'lot', editable: true, sort: 2 },
      { key: 'rent', label: 'loyer', editable: true },
      { key: 'charges', label: 'charges', editable: true },
      { key: 'owner_dropdown', label: 'propriétaire', dropDownItems: ownersDropDown, sort: 1 },
      { key: 'lodger_dropdown', label: 'locataire', dropDownItems: lodgersDropDown, sort: 2 },
      { key: 'actions', label: 'Actions' }
    ]
  }

  extractUpdatedFieldsFromRow(estates: Estate[], row: UiTableRow): Record<string, any> {
    const estate = estates.find(estate => estate.id === row.data['id']);
    if (!estate) throw new Error('Estate not matching with table row');

    const updatedFields = this.getUpdatedFields(estate, row);

    return {
      id: estate.id,
      ...updatedFields
    }
  }

  extractEstateFromRow(estates: Estate[], row: UiTableRow): Estate {
    const estate = estates.find(estate => estate.id === row.data['id']);
    if (!estate) throw new Error('Estate not matching with table row');
    return estate;
  }

  private getUpdatedFields(estate: Estate, row: UiTableRow) {

    const potentialUpdatedFiedls = {
      plot: row.cells['plot'],
      rent: row.cells['rent'],
      charges: row.cells['charges'],
      owner_id: (row.cells['owner_dropdown'] as UiDropdownItem<any>)?.value,
      lodger_id: (row.cells['lodger_dropdown'] as UiDropdownItem<any>)?.value,
    }

    const actualEstateUpdatableFields = {
      plot: estate.plot,
      rent: estate.rent,
      charges: estate.charges,
      owner_id: estate.owner_id,
      lodger_id: estate.lodger_id,
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
      value: 'new', label: 'créer un nouveau', command: () => {
        this.ownersCommands.createOwner()
        return true;
      }
    })
    return ownersDropdownItems;
  }

  private createLodgerDropdownItems(estates: Estate[], lodgers: Lodger[]): UiDropdownItem<any>[] {
    let lodgersActionsDropdownItems: UiDropdownItem<any>[] = [];
    lodgersActionsDropdownItems.push(createLodgersDropdown(this.estatesCommands, lodgers, estates))
    lodgersActionsDropdownItems.push(createRentReceiptDropdown(this.rentsCommands, estates))
    return lodgersActionsDropdownItems;
  }

  private createRows(estates: Estate[]): UiTableRow[] {
    return estates.map(estate => this.formatUiTableRow(estate));
  }

  private formatUiTableRow(estate: Estate): UiTableRow {
    return {
      data: { id: estate.id},
      cells: {
        address: estate.street + ' ' + estate.city + ' ' + estate.zip,
        plot: estate.plot ?? '',
        rent: estate.rent ?? 0,
        charges: estate.charges ?? 0,
        owner_dropdown: ({ label: estate.owner?.name, value: estate.owner?.id } as any),
        lodger_dropdown: ({ label: estate.lodger?.name ?? '', value: estate.lodger?.id } as any),
        actions: ({
          icon: 'delete', label: '', command: () => {
            this.estatesCommands.removeEstate(estate)
          }
        } as any)
      }
    }
  }

}
