import { Component } from '@angular/core';
import { EstatePage } from '../../../../common/pages/estates.page.component';
import { CreateOwnerPopupComponent } from 'src/app/common/popups/create-owner-popup/create-owner-popup.component';
import { CreateLodgerPopupComponent } from 'src/app/common/popups/create-lodger-popup/create-lodger-popup.component';

@Component({
  selector: 'app-estates-page',
  templateUrl: './estates-page.component.html',
  styleUrl: './estates-page.component.scss'
})
export class EstatesMobilePageComponent extends EstatePage {

  openCreateOwner() {
    this.modalService.create({
      nzTitle: 'Ajouter un nouveau propriétaire',
      nzContent: CreateOwnerPopupComponent,
      nzFooter: null
    })
  }

  openCreateLodger() {
    this.modalService.create({
      nzTitle: 'Ajouter un nouveau locataire',
      nzContent: CreateLodgerPopupComponent,
      nzFooter: null
    })
  }

}
