import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'prospections-handler-menu',
  standalone: false,
  templateUrl: './desktop-prospections-handler-menu.component.html',
  styleUrl: './desktop-prospections-handler-menu.component.scss'
})
export class DesktopProspectionsHandlerMenuComponent {

  constructor(private router: Router){}

  createNewProspectionEstate(){

  }

  createNewSeller(){}


  navigate(route: string) {
    this.router.navigate(['desktop/me/dashboard/prospections/', route]);
  }

}
