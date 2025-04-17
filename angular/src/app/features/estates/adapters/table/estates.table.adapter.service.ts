import { Injectable } from "@angular/core";
import { Lodger } from "src/app/features/lodgers/models/lodger.model";
import { Owner } from "src/app/features/owners/models/owner.model";
import { OwnersCommandsService } from "src/app/features/owners/commands/owners.command.service";
import { RentsCommandsService } from "src/app/features/rents/commands/rents.commands.service";
import { UiDropdownItem } from "src/app/ui/components/ui-dropdown/model/ui-dropdown-item.model";
import { UiTableRow } from "src/app/ui/components/ui-table/models/ui-table-row.model";
import { UiTableColumnItem } from "src/app/ui/components/ui-table/models/ui-table.column.model";
import { EstatesCommandsService } from "../../commands/estates.commands.service";
import { Estate } from "../../models/estate.model";
import { createLodgersDropdown, createRentReceiptDropdown } from "./estates.lodgers.table.utils";
import { LodgersCommandsService } from "src/app/features/lodgers/commands/lodgers.commands.service";
import { uniq } from "lodash";
import { NzTableFilterFn, NzTableFilterList, NzTableFilterValue } from "ng-zorro-antd/table";
import { UiItem } from "src/app/ui/models/ui-item.model";
import { UiNestedDropdown } from "src/app/ui/components/ui-nested-dropdown/model/ui-nested-dropdown.model";

@Injectable({
  providedIn: 'root'
})
export class EstatesUiTableAdapter {

  columns: UiTableColumnItem[] = [];

  constructor(private estatesCommands: EstatesCommandsService,
              private ownersCommands: OwnersCommandsService,
              private lodgersCommands: LodgersCommandsService,
              private rentsCommands: RentsCommandsService) {
    // console.log('esate ui table adapter constructor');
  }

  buildTableList(estates: Estate[], owners: Owner[], lodgers: Lodger[]): { columns: UiTableColumnItem[], rows: UiTableRow[] } {
    return {
      columns: this.createColumns(estates, owners, lodgers),
      rows: this.createRows(estates)
    };
  }

  private createColumns(estates: Estate[], owners: Owner[], lodgers: Lodger[]): UiTableColumnItem[] {

    return [
      this.buildAdressColumnField(estates),
      { key: 'plot', label: 'lot', editable: true, sort: 2, type: 'text' },
      { key: 'rent', label: 'loyer', editable: true, type: 'number' },
      { key: 'charges', label: 'charges', editable: true, type: 'number' },
      this.buildOwnersColumnField(estates, owners),
      this.buildLodgersColumnField(estates, lodgers),
      { key: 'actions', label: 'Actions', type: 'text' }
    ]
  }

  private buildAdressColumnField(estates: Estate[]): UiTableColumnItem{
    const adresses = uniq(estates.map(estate => estate.address));
    if(adresses.length < estates.length){
      const addressList: NzTableFilterList = uniq(adresses).map(address => ({
        text: address,
        value: address
      }));
      const addressFilterFn: NzTableFilterFn<UiTableRow> = (values: string[], filter: UiTableRow) => {
        return values.includes(filter.cells[0] as string);
      };
      return { key: 'address', label: 'Adresse', sort: 1, type: 'text', filter: addressList, filterFn: addressFilterFn };
    }else{
      return { key: 'address', label: 'Adresse', sort: 1, type: 'text' };
    }
  }

  private buildOwnersColumnField(estates: Estate[], owners: Owner[]): UiTableColumnItem{

    const ownersDropdownItems = this.createOwnerDropdownItems(owners);

    const usedOwners = estates.filter(estate => estate.owner_id !== null);
    const uniqUsedOwnersIds = uniq(usedOwners.map(estate => estate.owner_id));
    if(uniqUsedOwnersIds.length < usedOwners.length){
      const ownersList: NzTableFilterList = uniqUsedOwnersIds.map(ownerId => ({
        text: owners.find(owner => owner.id === ownerId)?.name as string,
        value: ownerId
      }));
      const ownersFilterFn: NzTableFilterFn<UiTableRow> = (values: string[], filter: UiTableRow) => {
        return values.includes((filter.cells[4] as UiDropdownItem<string>)?.value as string);
      };
      return { key: 'owner_dropdown', label: 'propriétaire', type: 'dropdown', dropdown: ownersDropdownItems, sort: 1, filter: ownersList, filterFn: ownersFilterFn };
    }

    return { key: 'owner_dropdown', label: 'propriétaire', type: 'dropdown', dropdown: ownersDropdownItems, sort: 1 };
  }

  private buildLodgersColumnField(estates: Estate[], lodgers: Lodger[]): UiTableColumnItem {

    const lodgersDropdownItems = this.createLodgerDropdownItems(estates, lodgers);

    const usedLodgers = estates.filter(estate => estate.lodger_id !== null);
    const uniqUsedLodgersIds = uniq(usedLodgers.map(estate => estate.lodger_id));
    if(uniqUsedLodgersIds.length < usedLodgers.length){
      const lodgersList: NzTableFilterList = uniqUsedLodgersIds.map(lodgerId => ({
        text: lodgers.find(lodger => lodger.id === lodgerId)?.name as string,
        value: lodgerId
      }));
      const lodgersFilterFn: NzTableFilterFn<UiTableRow> = (values: string[], filter: UiTableRow) => {
        return values.includes((filter.cells[5] as UiDropdownItem<string>)?.value as string);
      };
      return { key: 'lodger_dropdown', label: 'locataire', type: 'dropdown', dropdown: lodgersDropdownItems, sort: 1, filter: lodgersList, filterFn: lodgersFilterFn };
    }

    return { key: 'lodger_dropdown', label: 'locataire', type: 'dropdown', dropdown: lodgersDropdownItems, sort: 1 };
  }

  private createRows(estates: Estate[]): UiTableRow[] {
    return estates.map(estate => this.formatUiTableRow(estate));
  }

  private createOwnerDropdownItems(owners: Owner[]): UiNestedDropdown {
    const ownersDropdownItems: UiDropdownItem<any>[] = owners.map(owner => ({ value: owner.id, label: owner.name }));
    ownersDropdownItems.push({
      value: 'new', label: 'créer un nouveau', command: () => {
        this.ownersCommands.createOwner()
        return true;
      }
    })
    return {list: ownersDropdownItems};
  }

  private createLodgerDropdownItems(estates: Estate[], lodgers: Lodger[]): UiNestedDropdown {
    let lodgersActionsDropdownItems: UiDropdownItem<any>[] = [];
    lodgersActionsDropdownItems.push(createLodgersDropdown(this.lodgersCommands, lodgers, estates))
    lodgersActionsDropdownItems.push(createRentReceiptDropdown(this.rentsCommands, estates))
    return {list: lodgersActionsDropdownItems};
  }

  private formatUiTableRow(estate: Estate): UiTableRow {
    return {
      data: { id: estate.id },
      cells: {
        address: estate.street + ' ' + estate.city + ' ' + estate.zip,
        plot: estate.plot ?? '',
        rent: estate.rent ?? 0,
        charges: estate.charges ?? 0,
        owner_dropdown: ({ label: estate.owner?.name, value: estate.owner?.id } as any),
        lodger_dropdown: ({ label: estate.lodger?.name ?? '', value: estate.lodger?.id } as any),
        actions: ({
          icon: 'trash', label: '', command: () => {
            this.estatesCommands.removeEstate(estate)
          }
        } as any)
      }
    }
  }

}
