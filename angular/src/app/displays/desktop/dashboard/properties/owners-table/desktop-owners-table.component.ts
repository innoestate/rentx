import { Component } from '@angular/core';
import { OwnersTableDirective } from 'src/app/features/owners/components/owners.table.directive';
import { DesktopOwnersCommandsService } from '../commands/desktop.owners.command';
import { OwnersDataService } from 'src/app/features/owners/data/owners.data.service';
import { OwnersTableAdapterService } from 'src/app/features/owners/adapters/table/owners.table.adapter';
import { OwnersCommandsService } from 'src/app/features/owners/commands/owners.command.service';

@Component({
  selector: 'app-desktop-owners-table',
  standalone: false,
  templateUrl: './desktop-owners-table.component.html',
  styleUrl: './desktop-owners-table.component.scss'
})
export class DesktopOwnersTableComponent extends OwnersTableDirective {

  constructor(protected override ownersData: OwnersDataService,
      protected override ownersUiAdapter: OwnersTableAdapterService,
      protected override ownersCommands: DesktopOwnersCommandsService) {
    super(ownersData, ownersUiAdapter, ownersCommands);
  }

}
