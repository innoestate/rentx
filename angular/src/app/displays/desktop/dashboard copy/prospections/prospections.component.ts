import { Component } from '@angular/core';
import { ProspectionsDataService } from 'src/app/features/prospections/data/services/prospections.data.service';
import { SellersDataService } from 'src/app/features/sellers/data/services/sellers.data.service';

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
      this.sellersData.loadSellers();
  }

}
