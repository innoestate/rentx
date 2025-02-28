import { computed, Injectable, Signal } from "@angular/core";
import { Estate } from "src/app/core/models/estate.model";
import { Owner } from "src/app/core/models/owner.model";
import { OwnersDataService } from "src/app/owners/data/owners.data.service";
import { UxTableRow } from "src/app/ux/components/ux-table/models/ux-table-row.model";
import { UxTableColumnItem } from "src/app/ux/components/ux-table/models/ux-table.column.model";
import { EstatesDataService } from "../data/esates.data.service";
import { UxDropdownItem } from "src/app/ux/components/ux-dropdown/model/ux-dropdown-item.model";
import { UxPopupService } from "src/app/ux/popup/services/popup.service";
import { CreateDesktopEstatePopupComponent } from "src/app/common/popups/create-estate-popup/create-estate-popup.component";


@Injectable({
  providedIn: 'root'
})
export class EstatesBusiness {

  ownersDropdownItems: UxDropdownItem<string | any[]>[] = [];

  constructor(private estatesData: EstatesDataService, private ownersData: OwnersDataService, private popupService: UxPopupService) { }

  getTableList(): Signal<{ columns: UxTableColumnItem[], rows: UxTableRow[] }> {
    return computed(() => {

      const estates = this.estatesData.getEstates()();
      const owners = this.ownersData.getOwners()();

      const columns = this.createColumns(owners);
      const rows = this.createRows(estates);

      console.log('rows', rows);
      console.log('columns', columns);

      return {
        columns,
        rows
      }
    });
  }

  private createColumns(owners: Owner[]): UxTableColumnItem[] {


    this.ownersDropdownItems = owners.map(owner => ({ target: owner.id, label: owner.name }));
    this.ownersDropdownItems.push({
      target: 'new', label: 'créer un nouveau', command: () => {
        setTimeout(() => {
          this.popupService.openPopup(CreateDesktopEstatePopupComponent, 'Ajouter un propriétaire');
        }, 1000);
        return true;
      }
    })
    // this.ownersDropdownItems.push({ target: [{label: 'tester', target: 'tester'}], label: 'test'})

    return [
      { key: 'address', label: 'Adresse' },
      { key: 'plot', label: 'lot', editable: true },
      { key: 'rent', label: 'loyer', editable: true },
      { key: 'charges', label: 'charges', editable: true },
      { key: 'owner', label: 'propriétaire', dropDownItems: this.ownersDropdownItems },
      { key: 'lodger', label: 'locataire' },
      { key: 'actions', label: 'Actions' }
    ]
  }

  private createRows(estates: Estate[]): UxTableRow[] {
    return estates.map(estate => {
      return {
        address: estate.street + ' ' + estate.city + ' ' + estate.zip,
        plot: estate.plot ?? '',
        rent: estate.rent ?? 0,
        charges: estate.charges ?? 0,
        owner: ({ label: estate.owner?.name, target: estate.owner?.id } as any),
        lodger: estate.lodger?.name ?? '',
        actions: ({ icon: 'delete', label: '', command: () => {
          this.estatesData.remove(estate.id)
         } } as any)
      }
    });
  }

}
