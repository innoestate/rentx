import { Component, input } from '@angular/core';
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

  constructor(private prospectionFacade: ProspectionStoreFacade) { }

  setSeller(seller: Seller) {
    this.prospectionFacade.setSeller(this.prospection(), seller);
  }

  create() {

  }

}
