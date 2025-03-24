import { Component } from '@angular/core';
import { ProspectionsTableAdapter } from 'src/app/prospections/adapters/prospections.table.adapter';
import { ProspectionsTableCommands } from 'src/app/prospections/commands/prospections.table.command.interface';
import { ProspectionTableDirective } from 'src/app/prospections/components/prospection-table.directive';
import { ProspectionsDataService } from 'src/app/prospections/data/service/prospections.data.service';
import { SellersDataService } from 'src/app/sellers/data/service/sellers.data.service';
import { UiTableRow } from 'src/app/ui/components/ui-table/models/ui-table-row.model';
import { DesktopProspectionsCommandsService } from '../commands/desktop.prospections.commands.service';

@Component({
  standalone: false,
  templateUrl: './desktop-prospections-table.component.html',
  styleUrl: './desktop-prospections-table.component.scss'
})
export class DesktopProspectionsTableComponent extends ProspectionTableDirective implements ProspectionsTableCommands {

  constructor(protected override prospectionsData: ProspectionsDataService,
              protected override SellersData: SellersDataService,
              protected override adapter: ProspectionsTableAdapter,
              private commandsService: DesktopProspectionsCommandsService ) {
    super(prospectionsData, SellersData, adapter);
  }

  override delete(row: UiTableRow) {
    this.commandsService.delete(row.data['id']);
    return true;
  }

}
