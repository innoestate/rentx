import { Component, ElementRef } from '@angular/core';
import { LodgersTableAdapterService } from 'src/app/features/lodgers/adapters/lodgers.table.adapter';
import { LodgersCommandsService } from 'src/app/features/lodgers/commands/lodgers.commands.service';
import { LodgersTableDirective } from 'src/app/features/lodgers/components/lodgers.table.directive';
import { LodgersDataService } from 'src/app/features/lodgers/data/lodgers.data.service';
import { DesktopLodgersCommandsService } from '../commands/deskop.lodgers.command';

@Component({
  selector: 'app-lodgers-table',
  standalone: false,
  templateUrl: './lodgers-table.component.html',
  styleUrl: './lodgers-table.component.scss'
})
export class DesktopLodgersTableComponent extends LodgersTableDirective {

  constructor(protected override lodgersData: LodgersDataService,
    protected override lodgersUiAdapter: LodgersTableAdapterService,
    protected override lodgersCommands: DesktopLodgersCommandsService,
    protected override elRef: ElementRef) {
    super(lodgersData, lodgersUiAdapter, lodgersCommands, elRef);
  }

}
