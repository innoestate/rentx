import { Component } from '@angular/core';
import { ProspectionsTableAdapterService } from 'src/app/features/prospections/adapters/table/prospections.table.adapter.service';
import { ProspectionsTableDirective } from 'src/app/features/prospections/components/table/prospections.table.directive';
import { ProspectionsDataService } from 'src/app/features/prospections/data/services/prospections.data.service';
import { SellersDataService } from 'src/app/features/sellers/data/services/sellers.data.service';
import { UiTableRow } from 'src/app/ui/components/ui-table/models/ui-table-row.model';
import { DesktopProspectionsCommandsService } from '../../commands/desktop.prospections.commands.service';
import { InvestScopeDisplayManager } from 'src/app/features/invest-scope/displayer/invest-scope.displayer.manager';

@Component({
  standalone: false,
  templateUrl: './desktop-prospections-table.component.html',
  styleUrl: './desktop-prospections-table.component.scss'
})
export class DesktopProspectionsTableComponent extends ProspectionsTableDirective {

  constructor(protected override prospectionsData: ProspectionsDataService,
              protected override SellersData: SellersDataService,
              protected override tableAdapter: ProspectionsTableAdapterService,
              private commandsService: DesktopProspectionsCommandsService,
              private displayManager: InvestScopeDisplayManager ) {
    super(prospectionsData, SellersData, tableAdapter, commandsService);
    console.log('prospections table constructor')
  }

  override deleteRow(row: UiTableRow) {
    this.commandsService.delete(row.data['id']);
    return true;
  }

  selectRow(row: UiTableRow) {
    const prospection = this.prospections().find(prospection => prospection.id === row.data['id']);
    if(!prospection) throw new Error('Prospection not found');
    this.displayManager.selectItem(prospection);
  }

}
