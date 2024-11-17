import { Component } from '@angular/core';
import { EstatePage } from 'src/app/common/pages/estates.page.component';
import { CreateDesktopEstatePopupComponent } from '../../popups/create-estate-popup/create-estate-popup.component';

@Component({
  selector: 'app-estates',
  templateUrl: './estates.component.html',
  styleUrl: './estates.component.scss'
})
export class EstatesPageDesktopComponent extends EstatePage{

  openCreateEstatePopup() {
    this.modalService.create({
      nzTitle: 'Créer un nouveau bien',
      nzContent: CreateDesktopEstatePopupComponent,
      nzFooter: null
    })
  }

}
