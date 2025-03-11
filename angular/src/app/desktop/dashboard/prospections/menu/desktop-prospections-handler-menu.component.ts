import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SellersCommandsService } from 'src/app/sellers/commands/sellers.commands.service';

@Component({
  selector: 'prospections-handler-menu',
  standalone: false,
  templateUrl: './desktop-prospections-handler-menu.component.html',
  styleUrl: './desktop-prospections-handler-menu.component.scss'
})
export class DesktopProspectionsHandlerMenuComponent {

  constructor(private router: Router, private sellersCommands: SellersCommandsService){}

  createNewProspectionEstate(){

  }

  createNewSeller(){
    this.sellersCommands.createNew();
  }


  navigate(route: string) {
    this.router.navigate(['desktop/me/dashboard/prospections/', route]);
  }

}
