import { Component } from '@angular/core';
import { EstatesDataService } from 'src/app/features/estates/data/service/esates.data.service';
import { LodgersDataService } from 'src/app/features/lodgers/data/lodgers.data.service';
import { OwnersDataService } from 'src/app/features/owners/data/owners.data.service';
import { PropertiesDisplayAdapter } from 'src/app/features/properties/adapter/properties.displayer.adapter';
import { PropertiesDisplayerDirective } from 'src/app/features/properties/directives/properties.displayer.directive';
import { PropertiesDisplayerManager } from 'src/app/features/properties/displayer/properties.displayer.manager';
import { RentsDataService } from 'src/app/features/rents/data/service/rents.data.service';

@Component({
  standalone: false,
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.scss'
})
export class DesktopPropertiesComponent extends PropertiesDisplayerDirective{

  constructor(protected override displayManager: PropertiesDisplayerManager,
              protected override adapter: PropertiesDisplayAdapter,
              private estatesDataService: EstatesDataService,
              private ownersDataService: OwnersDataService,
              private lodgersDataService: LodgersDataService,
              private rentsDataService: RentsDataService) {
    super(displayManager, adapter);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.estatesDataService.loadEstates();
    this.ownersDataService.loadOwners();
    this.lodgersDataService.loadLodgers();
    this.rentsDataService.loadMonthlyRents();
  }

}
