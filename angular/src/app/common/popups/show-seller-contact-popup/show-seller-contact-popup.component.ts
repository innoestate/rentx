import { Component, Inject } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { Seller } from 'src/app/core/models/seller.model';

@Component({
  selector: 'show-seller-contact-popup',
  templateUrl: './show-seller-contact-popup.component.html',
  standalone: true,
  imports: [
    NzSelectModule,
    NzButtonModule
  ],
  styleUrls: ['./show-seller-contact-popup.component.css']
})
export class ShowSellerContactPopupComponent {

  seller: Seller = this.data.seller;

  constructor(
    @Inject(NZ_MODAL_DATA) public data: { seller: Seller },
    private modal: NzModalRef
  ) {}

  close(): void {
    this.modal.close();
  }
}
