import { Component } from '@angular/core';
import { ProspectionsDataService } from 'src/app/prospections/data/service/prospections.data.service';
import { SellersDataService } from 'src/app/sellers/data/service/sellers.data.service';

@Component({
  selector: 'app-prospections',
  templateUrl: './prospections.component.html',
  styleUrl: './prospections.component.scss',
  standalone: false
})
export class DesktopProspectionsComponent {

  constructor(private prospectionsData: ProspectionsDataService,
              private sellersData: SellersDataService){

      this.prospectionsData.loadProspections();
      this.sellersData.load();
  }

}
