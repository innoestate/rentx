import { Component, ElementRef } from '@angular/core';
import { InvestScopeDisplayManager } from 'src/app/features/invest-scope/displayer/invest-scope.displayer.manager';
import { ProspectionsTableService } from 'src/app/features/prospections/services/prospections.table.service';
import { UiDisplayerComponent } from 'src/app/ui/components/ui-displayer/ui-displayer.component';
import { UiTableRow } from 'src/app/ui/components/ui-table/models/ui-table-row.model';

@Component({
  standalone: false,
  templateUrl: './desktop-prospections-table.component.html',
  styleUrl: './desktop-prospections-table.component.scss'
})
export class DesktopProspectionsTableComponent extends UiDisplayerComponent {

  table = this.tableService.buildTable();

  constructor(protected tableService: ProspectionsTableService,
              private displayManager: InvestScopeDisplayManager,
              protected override elRef: ElementRef) {
    super(elRef);
  }

  updateRow(row: UiTableRow) {
    this.tableService.updateRow(row);
  }

  selectRow(row: UiTableRow) {
    const prospection = this.tableService.prospections()!.find(prospection => prospection.id === row.data['id']);
    if (!prospection) throw new Error('Prospection not found');
    this.displayManager.selectItem(prospection);
  }

}
