import { Component } from '@angular/core';
import { ProspectionsTableAdapterService } from 'src/app/features/prospections/adapters/table/prospections.table.adapter.service';
import { ProspectionsTableCommands } from 'src/app/features/prospections/commands/table/prospections.table.commands.interface';
import { ProspectionsTableDirective } from 'src/app/features/prospections/components/table/prospections.table.directive';
import { ProspectionsDataService } from 'src/app/features/prospections/data/services/prospections.data.service';
import { SellersDataService } from 'src/app/features/sellers/data/services/sellers.data.service';
import { UiTableRow } from 'src/app/ui/components/ui-table/models/ui-table-row.model';
import { DesktopProspectionsCommandsService } from '../commands/desktop.prospections.commands.service';

@Component({
  standalone: false,
  templateUrl: './desktop-prospections-table.component.html',
  styleUrl: './desktop-prospections-table.component.scss'
})
export class DesktopProspectionsTableComponent extends ProspectionsTableDirective implements ProspectionsTableCommands {

  constructor(protected override prospectionsData: ProspectionsDataService,
              protected override SellersData: SellersDataService,
              protected override tableAdapter: ProspectionsTableAdapterService,
              private commandsService: DesktopProspectionsCommandsService ) {
    super(prospectionsData, SellersData, tableAdapter);
  }

  override delete(row: UiTableRow) {
    this.commandsService.delete(row.data['id']);
    return true;
  }

}
