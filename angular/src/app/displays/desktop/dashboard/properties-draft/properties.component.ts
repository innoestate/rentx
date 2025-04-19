import { Component, OnInit } from '@angular/core';
import { EstatesDataService } from 'src/app/features/estates/data/service/esates.data.service';
import { LodgersDataService } from 'src/app/features/lodgers/data/lodgers.data.service';
import { OwnersDataService } from 'src/app/features/owners/data/owners.data.service';
import { RentsDataService } from 'src/app/features/rents/data/service/rents.data.service';

@Component({
  standalone: false,
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.scss',
})
export class DesktopEstatesHandlerComponent implements OnInit{

  constructor(private estatesDataService: EstatesDataService,
              private ownersDataService: OwnersDataService,
              private lodgersDataService: LodgersDataService,
              private rentsDataService: RentsDataService) { }

  ngOnInit(): void {
    this.estatesDataService.loadEstates();
    this.ownersDataService.loadOwners();
    this.lodgersDataService.loadLodgers();
    this.rentsDataService.loadMonthlyRents();
  }

}
