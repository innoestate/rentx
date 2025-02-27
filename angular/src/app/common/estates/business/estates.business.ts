import { effect, Injectable, signal, Signal } from "@angular/core";
import { UxTableRow } from "src/app/ux/components/ux-table/models/ux-table-row.model";
import { UxTableColumnItem } from "src/app/ux/components/ux-table/models/ux-table.column.model";
import { EstatesDataService } from "../data/esates.data.service";


@Injectable({
  providedIn: 'root'
})
export class EstatesBusiness {

  constructor(private estatesData: EstatesDataService) {
    effect(() => {
      const estates = this.estatesData.getEstates();
    })
    this.estatesData.loadEstates();

  }

  getTableList(): Signal<{ columns: UxTableColumnItem[], rows: UxTableRow[] }> {
    const estates = this.estatesData.getEstates();
    return signal({ columns: this.createColumns(), rows: this.createRows() });
  }

  private createColumns(): UxTableColumnItem[] {
    return [
      { key: 'adress', label: 'Adresse' },
      { key: 'plot', label: 'lot'},
      { key: 'rent', label: 'loyer'},
      { key: 'charges', label: 'charges'},
      { key: 'owner', label: 'propriétaire'},
      { key: 'lodger', label: 'locataire'},
      { key: 'actions', label: 'Actions'}
    ]
  }

  private createRows(): UxTableRow[] {
    return []
  }

}
