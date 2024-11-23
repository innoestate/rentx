import { computed, Directive, effect, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Estate } from 'src/app/core/models/estate.model';
import { Owner } from 'src/app/core/models/owner.model';
import { loadEstates } from 'src/app/core/store/estate/estates.actions';
import { selectEstates } from 'src/app/core/store/estate/estates.selectors';
import { selectOwners } from 'src/app/core/store/owner/owners.selectors';
import { formatEstateDtoToEstateUx, formatEstatesDtoToEstateUx } from 'src/app/core/utils/estate.utils';

@Directive()
export class EstatePage implements OnInit {

  owners = this.store.selectSignal(selectOwners);
  estates = computed(() => formatEstatesDtoToEstateUx(this.store.selectSignal(selectEstates)(), this.owners()));
  editId!: string | null;

  constructor(protected store: Store, protected modalService: NzModalService) {
    effect(() => console.log(this.estates()));
  }

  ngOnInit(): void {
    this.store.dispatch(loadEstates());
  }

  sendRentReceiptByEmail(estate: Estate) {
    // this.store.dispatch({ type: '[Estates] Send Rent Receipt By Email', estateId });
  }

  createOwner(estate?: Estate) {
    // this.store.dispatch({ type: '[Estates] Create Owner', estateId });
  }

  deleteEstate(estate: Estate) {
    // this.store.dispatch({ type: '[Estates] Delete Estate', estateId });
  }

  setOwner(estate: Estate, owner?: Owner) {
    // this.store.dispatch({ type: '[Estates] Set Owner', estateId, ownerId });
  }

}
