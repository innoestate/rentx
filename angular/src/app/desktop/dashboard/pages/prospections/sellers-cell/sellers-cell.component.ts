import { Component, input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Prospection } from 'src/app/core/models/prospection.model';
import { Seller } from 'src/app/core/models/seller.model';
import { updateProspection } from 'src/app/core/store/prospections/prospections.actions';
import { selectAllSellers } from 'src/app/core/store/sellers/sellers.selectors';

@Component({
  selector: 'sellers-cell',
  templateUrl: './sellers-cell.component.html',
  styleUrl: './sellers-cell.component.scss'
})
export class SellersCellComponent {

  prospection = input.required<Prospection>();
  sellers = this.store.selectSignal(selectAllSellers);

  constructor(private store: Store) {}


  setSeller(seller: Seller) {
    this.store.dispatch(updateProspection({id: this.prospection().id as string, changes: {seller_id: seller.id}}));
  }

  create(){

  }

}
