import { Component, input } from '@angular/core';
import { CreateSellerPopupComponent } from 'src/app/common/popups/create-seller-popup/create-seller-popup.component';
import { ShowSellerContactPopupComponent } from 'src/app/common/popups/show-seller-contact-popup/show-seller-contact-popup.component';
import { ProspectionStoreFacade } from 'src/app/core/facade/prospection.store.facade';
import { Prospection } from 'src/app/core/models/prospection.model';
import { Seller } from 'src/app/core/models/seller.model';
import { PopupService } from 'src/app/ux/popup/services/popup.service';

@Component({
    selector: 'sellers-cell',
    templateUrl: './sellers-cell.component.html',
    styleUrl: './sellers-cell.component.scss',
    standalone: false
})
export class SellersCellComponent {

  prospection = input.required<Prospection>();
  sellers = this.prospectionFacade.getSellers();

  constructor(private prospectionFacade: ProspectionStoreFacade, private popupService: PopupService) { }

  setSeller(seller: Seller) {
    this.prospectionFacade.setSeller(this.prospection(), seller);
  }

  create() {
    this.popupService.openPopup(CreateSellerPopupComponent, 'Ajouter un vendeur / agent')
  }

  showContact() {
    this.popupService.openPopup(ShowSellerContactPopupComponent, 'Contact', { seller: this.prospection().seller });
  }

  removeSeller(seller: Seller) {
    this.prospectionFacade.removeSeller(seller);
  }

}
