import { Component } from '@angular/core';
import { EstatePage } from '../../../../common/pages/estates.page.component';
import { CreateDesktopEstatePopupComponent } from '../../../../common/popups/create-estate-popup/create-estate-popup.component';

@Component({
  selector: 'app-estates-page',
  templateUrl: './estates-page.component.html',
  styleUrl: './estates-page.component.scss'
})
export class EstatesMobilePageComponent extends EstatePage {

  openCreateEstatePopup() {
    this.modalService.create({
      nzTitle: 'Créer un nouveau bien',
      nzContent: CreateDesktopEstatePopupComponent,
      nzFooter: null
    })
  }

}
