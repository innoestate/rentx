import { Component } from '@angular/core';
import { EstatesUiTableAdapter } from 'src/app/features/estates/adapters/table/estates.table.adapter.service';
import { EstatesTableDirective } from 'src/app/features/estates/components/estates.table.directive';
import { EstatesDataService } from 'src/app/features/estates/data/service/esates.data.service';
import { LodgersDataService } from 'src/app/features/lodgers/data/lodgers.data.service';
import { OwnersDataService } from 'src/app/features/owners/data/owners.data.service';
import { RentsDataService } from 'src/app/features/rents/data/service/rents.data.service';
import { DesktopEstatesCommandsService } from '../commands/desktop.estates.command';

@Component({
  standalone: false,
  templateUrl: './estates-table.component.html',
  styleUrl: './estates-table.component.scss'
})
export class EstatesTableComponent extends EstatesTableDirective {

  constructor(protected override estatesData: EstatesDataService,
    protected override estatesUiAdapter: EstatesUiTableAdapter,
    protected override estatesCommands: DesktopEstatesCommandsService,
    protected override ownersData: OwnersDataService,
    protected override lodgersData: LodgersDataService,
    protected override monthlyRentsData: RentsDataService) {
    super(estatesData, estatesUiAdapter, estatesCommands, ownersData, lodgersData, monthlyRentsData);
  }

}
