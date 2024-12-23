import { computed, Directive, input } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Estate } from 'src/app/core/models/estate.model';
import { Lodger } from 'src/app/core/models/lodger.model';
import { editEstate } from 'src/app/core/store/estate/estates.actions';
import { deleteLodger as deleteLodgerInStore } from 'src/app/core/store/lodger/lodgers.actions';
import { selectLodgers } from 'src/app/core/store/lodger/lodgers.selectors';
import { RentService } from '../services/rents.service';

@Directive()
export class LodgerComponent {

  estate = input.required<Estate>();
  lodgers = this.store.selectSignal(selectLodgers);

  constructor(protected store: Store, protected modalService: NzModalService, protected actions$: Actions, protected rentService: RentService) { }

  downloadCustomizedRentReceipt() {
    this.rentService.downloadCustomizedRentReceipt(this.estate());
  }

  downloadRentReceipt() {
    this.rentService.downloadRentReceipt(this.estate());
  }

  senddRentReceipt() {
    this.rentService.sendRentReceiptByEmail(this.estate());
  }

  createLodger() {
    this.rentService.openCreateLodgerPopup(this.estate());
  }

  setLodger(lodger?: Lodger | null | undefined) {
    this.store.dispatch(editEstate({ estate: { id: this.estate().id, lodger_id: lodger?.id ?? '' } }));
  }

  deleteLodger(lodger: Lodger) {
    this.store.dispatch(deleteLodgerInStore({ lodgerId: lodger.id }));
  }

}
