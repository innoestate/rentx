import { Component, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { ProspectionsCommandsService } from 'src/app/prospections/commands/prospections.commands.service';
import { SellersCommandsService } from 'src/app/sellers/commands/sellers.commands.service';
import { SellersDataService } from 'src/app/sellers/data/service/sellers.data.service';
import { Seller_Dto } from 'src/app/sellers/models/seller.dto.model';

@Component({
  selector: 'prospections-handler-menu',
  standalone: false,
  templateUrl: './desktop-prospections-handler-menu.component.html',
  styleUrl: './desktop-prospections-handler-menu.component.scss'
})
export class DesktopProspectionsHandlerMenuComponent {

  sellers: Signal<Seller_Dto[]> = this.SellersData.get();

  constructor(private router: Router, private SellersData: SellersDataService, private sellersCommands: SellersCommandsService, private prospectionsCommands: ProspectionsCommandsService){}

  createNewProspectionEstate(){
    this.prospectionsCommands.createNew(this.sellers());
  }

  createNewSeller(){
    this.sellersCommands.createNew();
  }


  navigate(route: string) {
    this.router.navigate(['desktop/me/dashboard/prospections/', route]);
  }

}
