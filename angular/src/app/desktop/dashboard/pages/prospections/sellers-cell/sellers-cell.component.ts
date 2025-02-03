import { Component, input } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CreateSellerPopupComponent } from 'src/app/common/popups/create-seller-popup/create-seller-popup.component';
import { ShowSellerContactPopupComponent } from 'src/app/common/popups/show-seller-contact-popup/show-seller-contact-popup.component';
import { ProspectionStoreFacade } from 'src/app/core/facade/prospection.store.facade';
import { Prospection } from 'src/app/core/models/prospection.model';
import { Seller } from 'src/app/core/models/seller.model';

@Component({
  selector: 'sellers-cell',
  templateUrl: './sellers-cell.component.html',
  styleUrl: './sellers-cell.component.scss'
})
export class SellersCellComponent {

  prospection = input.required<Prospection>();
  sellers = this.prospectionFacade.getSellers();

  constructor(private prospectionFacade: ProspectionStoreFacade, private nzModalService: NzModalService) { }

  setSeller(seller: Seller) {
    this.prospectionFacade.setSeller(this.prospection(), seller);
  }

  create() {
    this.nzModalService.create({
      nzTitle: 'Create Seller',
      nzContent: CreateSellerPopupComponent,
      nzFooter: null
    });
  }

  showContact() {
    this.nzModalService.create({
      nzTitle: 'Contact',
      nzContent: ShowSellerContactPopupComponent,
      nzFooter: null,
      nzData: { seller: this.prospection().seller },
    })
  }

  removeSeller(seller: Seller) {
    this.prospectionFacade.removeSeller(seller);
  }

}
