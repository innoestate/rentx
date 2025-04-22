import { Injectable } from "@angular/core";
import { LocalizationsService } from "src/app/core/localizations/localizations.service";
import { UiNestedDropdown2 } from "src/app/ui/components/ui-nested-dropdown-actions/model/ui-nested-dropdown-actions.model";
import { UiTable2Row } from "src/app/ui/components/ui-table-2/models/ui-table-row.model";
import { UiTable2Column } from "src/app/ui/components/ui-table-2/models/ui-table.column.model";
import { Estate } from "../models/estate.model";

@Injectable({
  providedIn: 'root'
})
export class EstatesTable2AdapterService {

  constructor(private localization: LocalizationsService) { }

  createColumns(): UiTable2Column[] {
    return [
      {
        key: 'address',
        cell: { type: 'mediumString', sort: { priority: 1 }, label: { title: { label: 'Adresse' } } },
      },
      {
        key: 'plot',
        cell: { type: 'string', sort: { priority: 2 }, editable: true, label: { title: { label: 'Lot' } } },
      },
      {
        key: 'rent',
        cell: { type: 'string', sort: { priority: 3 }, editable: true, label: { title: { label: 'Loyer' } } },
      },
      {
        key: 'charges',
        cell: { type: 'string', sort: { priority: 4 }, editable: true, label: { title: { label: 'Charges' } } },
      },
      {
        key: 'owner',
        cell: { type: 'string', sort: { priority: 5 }, label: { title: { label: 'Propriétaire' } } },
      },
      {
        key: 'lodger',
        cell: { type: 'string', sort: { priority: 6 }, label: { title: { label: 'Locataire' } } },
      },
      {
        key: 'actions',
        cell: { type: 'dropdown-actions-icon', dropdown: this.buildColumnActions() },
      }
    ];
  }

  createRows(estates: Estate[]): UiTable2Row[] {
    return estates.map(estate => this.formatUiTableRow(estate));
  }

  private buildRowActions(): UiNestedDropdown2 {
    return {
      label: {
        icon: { name: 'down', size: 18, color: 'var(--color-tertiary-500)' },
      },
      list: [
        {
          label: {
            icon: { name: 'trash', size: 18, color: 'var(--color-error-300)'},
            title: { label: 'supprimer' },
            command: () => {
              console.log('implement command here');
              return true;
            }
          },
        }
      ]
    }
  }

  private buildColumnActions(): UiNestedDropdown2 {
    return {
      label: {
        icon: { name: 'gear', size: 24, color: 'var(--color-secondary-500)' },
      },
      list: [
        {
          label: {
            icon: { name: 'add-estate', size: 22, color: 'var(--color-secondary-500)'},
            title: { label: this.localization.getLocalization('estates', 'create') },
            command: () => {
              console.log('implement command here');
              return true;
            }
          },
        }
      ]
    }
  }

  formatUiTableRow(estate: Estate): UiTable2Row {
    console.log('estate', estate);
    return {
      data: { id: estate.id },
      cells: {
        address: { type: 'string', label: { title: { label: estate.plot_address }} },
        plot: { type: 'string', editable: true, label: { title: { label: estate.plot ?? '' }} },
        rent: { type: 'string', editable: true, label: { title: { label: estate.rent?.toString() ?? '' }} },
        charges: { type: 'string', editable: true, label: { title: { label: estate.charges?.toString() ?? '' }} },
        owner: { type: 'string', label: { title: { label: estate.owner?.name ?? '' }} },
        lodger: { type: 'string', label: { title: { label: estate.lodger?.name ?? '' }} },
        actions: { type: 'dropdown-actions', dropdown: this.buildRowActions() },
      },
    }
  }
}

