import { Component, computed, ElementRef, Signal, signal } from '@angular/core';
import { catchError, of, take } from 'rxjs';
import { LocalizationsService } from 'src/app/core/localizations/localizations.service';
import { fillEstates } from 'src/app/features/estates/adapters/estate.adapter.utils';
import { EstatesTableAdapterService } from 'src/app/features/estates/adapters/estates.table.adapter';
import { EstatesDataService } from 'src/app/features/estates/data/service/esates.data.service';
import { Estate } from 'src/app/features/estates/models/estate.model';
import { LodgersDataService } from 'src/app/features/lodgers/data/lodgers.data.service';
import { OwnersDataService } from 'src/app/features/owners/data/owners.data.service';
import { RentsCommandsService } from 'src/app/features/rents/commands/rents.commands.service';
import { RentsDataService } from 'src/app/features/rents/data/service/rents.data.service';
import { UiDisplayerComponent } from 'src/app/ui/components/ui-displayer/ui-displayer.component';
import { UiCell } from 'src/app/ui/components/ui-table/models/ui-cell.model';
import { UiTable2Row } from 'src/app/ui/components/ui-table/models/ui-table-row.model';
import { UiTableColumn } from 'src/app/ui/components/ui-table/models/ui-table.column.model';
import { UiTable2 } from 'src/app/ui/components/ui-table/models/ui-table.model';
import { DesktopLodgersCommandsService } from '../../commands/deskop.lodgers.command';
import { DesktopEstatesCommandsService } from '../../commands/desktop.estates.command';

@Component({
  selector: 'app-desktop-estates-table',
  standalone: false,
  templateUrl: './desktop-estates-table.component.html',
  styleUrl: './desktop-estates-table.component.scss'
})
export class DesktopEstatesTableComponent extends UiDisplayerComponent {


  table: UiTable2 = {
    columns: signal<UiTableColumn[]>(this.adapter.createColumns()),
    rows: this.getRows(),
    title: this.localization.getLocalization('estates', 'tableTitle'),
    commands: [
      {
        name: 'add-estate',
        size: 26,
        color: 'var(--color-secondary-500)',
        command: () => this.estatesCommands.createEstate()
      },
    ]
  };

  estatesDto = this.estatesData.getEstates();
  ownersDto = this.ownersData.getOwners();
  lodgersDto = this.lodgersData.getLodgers();
  monthlyRentsDto = this.monthlyRentsData.get();

  estates = computed(() => fillEstates(this.estatesDto(), this.ownersDto(), this.lodgersDto(), this.monthlyRentsDto()));


  constructor(
    private estatesData: EstatesDataService,
    private ownersData: OwnersDataService,
    private lodgersData: LodgersDataService,
    private monthlyRentsData: RentsDataService,
    private adapter: EstatesTableAdapterService,
    private localization: LocalizationsService,
    private estatesCommands: DesktopEstatesCommandsService,
    private lodgersCommands: DesktopLodgersCommandsService,
    private rentsCommands: RentsCommandsService,
    protected override elRef: ElementRef,
  ) {
    super(elRef);
  }

  getRows(): Signal<UiTable2Row[]> {
    return computed(() => {
      const rows = this.adapter.createRows(this.estates(), this.ownersDto(), this.lodgersDto());
      this.bindColumnsCommands(this.table.columns());
      this.bindRowsCommands(rows);
      return rows;
    })
  }

  bindColumnsCommands(columns: UiTableColumn[]) {
    columns.find(c => c.key === 'actions')!.cell.dropdown!.list![0].label!.command = () => this.estatesCommands.createEstate();
  }

  bindRowsCommands(rows: UiTable2Row[]) {
    rows.forEach(row => {

      const estate = this.estates().find(e => e.id === row.data.id)!;

      const id = row.data.id;
      row.cells['actions']!.dropdown!.list![0].label!.command = () => this.estatesCommands.deleteEstate(id);

      const create = row.cells['lodger']!.dropdown?.list?.find(dropdown => dropdown.label?.title?.label === this.localization.getLocalization('lodgers', 'create'));
      if(create){
        create.label!.command = () => this.lodgersCommands.createLodger();
      }
      const exitLodger = row.cells['lodger']!.dropdown?.list?.find(dropdown => dropdown.label?.title?.label === this.localization.getLocalization('estates', 'freeLodger'));
      if(exitLodger){
        exitLodger.label!.command = () => this.estatesData.updateEstate(id, { lodger_id: undefined });
      }

      const rentReceipt = row.cells['lodger']!.dropdown?.list?.find(dropdown => dropdown.label?.title?.label === this.localization.getLocalization('rentReceipts', 'label'));
      if(rentReceipt){
        const download = rentReceipt.list?.find(dropdown => dropdown.label?.title?.label === this.localization.getLocalization('rentReceipts', 'download'))!;
        download.label!.command = () => this.rentsCommands.downloadRentReceipt(estate).subscribe();
        const send = rentReceipt.list?.find(dropdown => dropdown.label?.title?.label === this.localization.getLocalization('rentReceipts', 'send'))!;
        send.label!.command = () => this.rentsCommands.sendRentReceiptByEmail(estate).subscribe();
        const customize = rentReceipt.list?.find(dropdown => dropdown.label?.title?.label === this.localization.getLocalization('rentReceipts', 'personalize'))!;
        customize.label!.command = () => this.rentsCommands.customizeRentReceipt(estate);
      }

    });
  }

  updateCell(event: { id: string, key: string, cell: UiCell }) {
    const value = this.adapter.getEditableValue(this.ownersDto(), this.lodgersDto(), event.key, event.cell);
    this.estatesData.updateEstate(event.id!, value).pipe(
      take(1),
      catchError(() => this.reloadEstateForResetCellPreviusValue(event.id))
    ).subscribe();
  }

  reloadEstateForResetCellPreviusValue(id: string) {
    const oldEstate = this.estates().find((e: Estate) => e.id === id);
    this.estatesData.updateEstate(id, { ...oldEstate! });
    return of(null);
  }

}

