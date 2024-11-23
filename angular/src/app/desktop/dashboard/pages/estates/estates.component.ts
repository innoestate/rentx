import { Component } from '@angular/core';
import { EstatePage } from 'src/app/common/pages/estates.page.component';
import { CreateDesktopEstatePopupComponent } from '../../../../common/popups/create-estate-popup/create-estate-popup.component';
import { Estate } from 'src/app/core/models/estate.model';
import { CreateOwnerPopupComponent } from '../../../../common/popups/create-owner-popup/create-owner-popup.component';
import { Action, Store } from '@ngrx/store';

@Component({
  selector: 'app-estates',
  templateUrl: './estates.component.html',
  styleUrl: './estates.component.scss'
})
export class EstatesPageDesktopComponent extends EstatePage {

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


}
