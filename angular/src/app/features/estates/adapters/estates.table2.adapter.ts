import { Injectable } from "@angular/core";
import { LocalizationsService } from "src/app/core/localizations/localizations.service";
import { OwnersCommandsService } from "src/app/features/owners/commands/owners.command.service";
import { Owner } from "src/app/features/owners/models/owner.model";
import { UiNestedDropdown2 } from "src/app/ui/components/ui-nested-dropdown-actions/model/ui-nested-dropdown-actions.model";
import { UiLabel2 } from "src/app/ui/components/ui-table-2/components/ui-label/models/ui-label.model";
import { UiCellBasic, UiCellDropdown } from "src/app/ui/components/ui-table-2/models/ui-cell.model";
import { UiTable2Row } from "src/app/ui/components/ui-table-2/models/ui-table-row.model";
import { UiTable2Column } from "src/app/ui/components/ui-table-2/models/ui-table.column.model";
import { Lodger } from "../../lodgers/models/lodger.model";
import { Estate } from "../models/estate.model";

interface EstateTableRow extends UiTable2Row {
  cells: {
    address: UiCellBasic;
    plot: UiCellBasic;
    rent: UiCellBasic;
    charges: UiCellBasic;
    owner: UiCellDropdown;
    lodger: UiCellDropdown;
    actions: UiCellBasic;
  }
}

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
        cell: { type: 'longString', sort: { priority: 1 }, label: { title: { label: 'Adresse' } } },
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

  createRows(estates: Estate[], owners: Owner[], lodgers: Lodger[]): UiTable2Row[] {
    return estates.map(estate => this.formatUiTableRow(estate, owners, lodgers));
  }

  getEditableValue(owners: Owner[], lodgers: Lodger[], key: string, cell: UiCellBasic | UiCellDropdown): Partial<Estate> {
    const updates: any = {};
    if (key === 'owner') {
      const ownerId = owners.find(owner => owner.name === cell.dropdown?.label?.title?.label)?.id;
      updates['owner_id'] = ownerId;
    } else if (key === 'lodger') {
      const lodgerId = lodgers.find(lodger => lodger.name === cell.dropdown?.label?.title?.label)?.id;
      updates['lodger_id'] = lodgerId;
    } else {
      updates[key] = (cell as UiCellBasic).label?.title?.label;
    }
    return updates;
  }

  private buildRowActions(): UiNestedDropdown2 {
    return {
      label: {
        icon: { name: 'down', size: 18, color: 'var(--color-tertiary-500)' },
      },
      list: [
        {
          label: {
            icon: { name: 'trash', size: 18, color: 'var(--color-error-300)' },
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
            icon: { name: 'add-estate', size: 22, color: 'var(--color-secondary-500)' },
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

  formatUiTableRow(estate: Estate, owners: Owner[], lodgers: Lodger[]): EstateTableRow {
    const ownerDropdown = this.createOwnerDropdown(owners);
    const selectedOwnerLabel: UiLabel2 = {
      title: { label: estate.owner?.name ?? 'Propriétaire' }
    };

    return {
      data: { id: estate.id },
      cells: {
        address: { type: 'string', label: { title: { label: estate.address } } },
        plot: { type: 'string', editable: true, label: { title: { label: estate.plot ?? '' } } },
        rent: { type: 'string', editable: true, label: { title: { label: estate.rent?.toString() ?? '' } } },
        charges: { type: 'string', editable: true, label: { title: { label: estate.charges?.toString() ?? '' } } },
        owner: {
          type: 'dropdown-select',
          dropdown: {
            ...ownerDropdown,
            label: selectedOwnerLabel
          }
        },
        lodger: { type: 'dropdown-select', dropdown: this.createLodgerDropdown(estate,lodgers) },
        actions: { type: 'dropdown-actions', dropdown: this.buildRowActions() },
      },
    }
  }

  private createOwnerDropdown(owners: Owner[]): UiNestedDropdown2 {
    const ownerItems = owners.map(owner => ({
      label: {
        title: { label: owner.name }
      }
    }));

    return {
      label: { title: { label: 'Propriétaire' } },
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

  private createLodgerDropdown(estate: Estate, lodgers: Lodger[]): UiNestedDropdown2 {

    const hasPay = (estate.lodger?.name && estate.actualMonthPaid) ?? false;

    return {
      label: { title: { label: estate.lodger?.name ?? '' }, color: hasPay ? 'var(--color-success-500)' : undefined },
      list: this.getLodgerDropdownList(lodgers, estate.lodger?.name)
    };
  }

  private getLodgerDropdownList(lodgers: Lodger[], lodgerName: string | undefined): UiNestedDropdown2[] {
    const list: UiNestedDropdown2[] = [];
    if(lodgers.length > 0){
      list.push(this.assignLodgers(lodgers, lodgerName));
    }
    if(lodgerName){
      list.push(this.rentReceipt());
    }
    list.push(this.createNewLodger());
    if(lodgerName){
      list.push(this.exitLodger());
    }
    return list;
  }

  private rentReceipt(){
    return {
      label: {
        title: { label: 'Quittances' },
        icon: { name: 'file-invoice', size: 24, color: 'var(--color-secondary-500)' },
      },
      list: [
        {
          label: {
            icon: { name: 'download-file', size: 22, color: 'var(--color-tertiary-500)' },
            title: { label: 'Télécharger' },
            command: () => {
              console.log('implement download method in component');
              return true;
            }
          },
        },
        {
          label: {
            icon: { name: 'send', size: 22, color: 'var(--color-tertiary-500)' },
            title: { label: 'Envoyer par mail' },
            command: () => {
              console.log('implement send method in component');
              return true;
            }
          },
        },
        {
          label: {
            icon: { name: 'gear', size: 22, color: 'var(--color-secondary-500)' },
            title: { label: 'Personnaliser' },
            command: () => {
              console.log('implement personalization method in component');
              return true;
            }
          },
        }
      ]
    }
  }

  private exitLodger() {
    return {
      label: {
        icon: { name: 'empty-house', size: 24, color: 'var(--color-secondary-500)' },
        title: { label: 'vacant' },
        command: () => {
          return true;
        }
      }
    }
  }

  private createNewLodger() {
    return {
      label: {
        icon: { name: 'add-lodger', size: 24, color: 'var(--color-secondary-500)' },
        title: { label: 'créer un nouveau' },
        command: () => {
          return true;
        }
      }
    }
  }

  private assignLodgers(lodgers: Lodger[], lodgerName: string | undefined): UiNestedDropdown2 {

    let iconName = lodgerName ? 'people-replace' : 'person-in';

    const lodgerItems = lodgers.filter(lodger => lodger.name !== lodgerName).map(lodger => ({
      label: {
        title: { label: lodger.name }
      }
    }));


    return {
      label: {
        icon: { name: iconName, size: 24, color: 'var(--color-secondary-500)' },
        title: { label: 'locataires' },
      },
      list: lodgerItems
    };
  }
}
