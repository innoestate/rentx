import { Directive, OnInit } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Estate } from 'src/app/core/models/estate.model';
import { deleteEstate, loadEstates } from 'src/app/core/store/estate/estates.actions';
import { selectEstates } from 'src/app/core/store/estate/estates.selectors';
import { selectLodgers } from 'src/app/core/store/lodger/lodgers.selectors';
import { selectOwners } from 'src/app/core/store/owner/owners.selectors';
import { CreateDesktopEstatePopupComponent } from '../popups/create-estate-popup/create-estate-popup.component';

@Directive()
export class EstatePage implements OnInit {

  owners = this.store.selectSignal(selectOwners);
  lodgers = this.store.selectSignal(selectLodgers);
  estates = this.store.selectSignal(selectEstates);
  editId!: string | null;

  constructor(protected store: Store, protected modalService: NzModalService, protected actions$: Actions) { }

  ngOnInit(): void {
    this.store.dispatch(loadEstates());
  }

  openCreateEstatePopup() {
    this.modalService.create({
      nzTitle: 'Créer un nouveau bien',
      nzContent: CreateDesktopEstatePopupComponent,
      nzFooter: null
    })
  }

  startEdit(id: string, ref: HTMLInputElement) {
    this.editId = id;
    setTimeout(() => {
      requestAnimationFrame(() => {
        ref.focus();
      })
    }, 0);
  }

  stopEdit() {
    this.editId = null;
  }

  edit(estate: Estate, fieldName: string, ref: HTMLInputElement) {
    const editableEstate: any = { id: estate.id };
    editableEstate[fieldName] = ref.value;
    this.store.dispatch({ type: '[Estates] Edit Estate', estate: editableEstate })
  }

  deleteEstate(estate: Estate) {
    this.store.dispatch(deleteEstate({ estateId: estate.id }));
  }

}
