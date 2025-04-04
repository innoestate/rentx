import { Component, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { SellersDataService } from 'src/app/features/sellers/data/services/sellers.data.service';
import { Seller_Dto } from 'src/app/features/sellers/models/seller.dto.model';
import { DesktopProspectionsCommandsService } from '../commands/desktop.prospections.commands.service';
import { DesktopSellersCommandsService } from '../commands/desktop.sellers.commands.service';

@Component({
  selector: 'prospections-handler-menu',
  standalone: false,
  templateUrl: './desktop-prospections-handler-menu.component.html',
  styleUrl: './desktop-prospections-handler-menu.component.scss'
})
export class DesktopProspectionsHandlerMenuComponent {

  sellers: Signal<Seller_Dto[]> = this.SellersData.getSellers();

  constructor(private router: Router, private SellersData: SellersDataService, private sellersCommands: DesktopSellersCommandsService, private prospectionsCommands: DesktopProspectionsCommandsService){}

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
