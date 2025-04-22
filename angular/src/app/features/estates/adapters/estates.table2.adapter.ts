import { Injectable } from "@angular/core";
import { LocalizationsService } from "src/app/core/localizations/localizations.service";
import { UiNestedDropdown2 } from "src/app/ui/components/ui-nested-dropdown-actions/model/ui-nested-dropdown-actions.model";
import { UiTable2Row } from "src/app/ui/components/ui-table-2/models/ui-table-row.model";
import { UiTable2Column } from "src/app/ui/components/ui-table-2/models/ui-table.column.model";
import { Estate } from "../models/estate.model";
import { OwnersCommandsService } from "src/app/features/owners/commands/owners.command.service";
import { Owner } from "src/app/features/owners/models/owner.model";
import { UiLabel2 } from "src/app/ui/components/ui-table-2/components/ui-label/models/ui-label.model";

@Injectable({
  providedIn: 'root'
})
export class EstatesTable2AdapterService {
  constructor(
    private localization: LocalizationsService,
    private ownersCommands: OwnersCommandsService
  ) { }

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
        cell: {
          type: 'string',
          sort: { priority: 5 },
          label: { title: { label: 'Propriétaire' } }
        },
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

  createRows(estates: Estate[], owners: Owner[]): UiTable2Row[] {
    return estates.map(estate => this.formatUiTableRow(estate, owners));
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

  formatUiTableRow(estate: Estate, owners: Owner[]): UiTable2Row {
    const ownerDropdown = this.createOwnerDropdownItems(owners);
    const selectedOwnerLabel: UiLabel2 = {
      title: { label: estate.owner?.name ?? 'Propriétaire' }
    };

    return {
      data: { id: estate.id },
      cells: {
        address: { type: 'string', label: { title: { label: estate.plot_address }} },
        plot: { type: 'string', editable: true, label: { title: { label: estate.plot ?? '' }} },
        rent: { type: 'string', editable: true, label: { title: { label: estate.rent?.toString() ?? '' }} },
        charges: { type: 'string', editable: true, label: { title: { label: estate.charges?.toString() ?? '' }} },
        owner: {
          type: 'dropdown-select',
          label: { title: { label: estate.owner?.name ?? '' }},
          dropdown: {
            ...ownerDropdown,
            label: selectedOwnerLabel
          }
        },
        lodger: { type: 'string', label: { title: { label: estate.lodger?.name ?? '' }} },
        actions: { type: 'dropdown-actions', dropdown: this.buildRowActions() },
      },
    }
  }

  private createOwnerDropdownItems(owners: Owner[]): UiNestedDropdown2 {
    const ownerItems = owners.map(owner => ({
      label: {
        title: { label: owner.name }
      }
    }));

    return {
      label: { title: { label: 'Propriétaire' }},
      list: [
        ...ownerItems,
        {
          label: {
            icon: { name: 'add-owner', size: 24, color: 'var(--color-secondary-500)' },
            title: { label: 'créer un nouveau' },
            command: () => {
              this.ownersCommands.createOwner();
              return true;
            }
          }
        }
      ]
    };
  }
}
