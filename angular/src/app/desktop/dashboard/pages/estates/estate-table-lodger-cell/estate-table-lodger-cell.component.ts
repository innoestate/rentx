import { Component, input } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { take, tap } from 'rxjs';
import { CreateLodgerPopupComponent } from 'src/app/common/popups/create-lodger-popup/create-lodger-popup.component';
import { Estate } from 'src/app/core/models/estate.model';
import { Lodger } from 'src/app/core/models/lodger.model';
import { RentsService } from 'src/app/core/services/rents.service';
import { editEstate, senddRentReceipt } from 'src/app/core/store/estate/estates.actions';
import { deleteLodger as deleteLodgerInStore } from 'src/app/core/store/lodger/lodgers.actions';
import { selectLodgers } from 'src/app/core/store/lodger/lodgers.selectors';

@Component({
  selector: 'estate-table-lodger-cell',
  templateUrl: './estate-table-lodger-cell.component.html',
  styleUrl: './estate-table-lodger-cell.component.scss'
})
export class EstateTableLodgerCellComponent {

  estate = input.required<Estate>();
  lodgers = this.store.selectSignal(selectLodgers);

  constructor(private store: Store, private rentsService: RentsService, private modalService: NzModalService) { }


  openCreateLodgerPopup() {
    this.modalService.create({
      nzTitle: 'Ajouter un nouveau locataire',
      nzContent: CreateLodgerPopupComponent,
      nzData: { estate: this.estate() },
      nzFooter: null
    })
  }

  downloadRentReceipt() {
    this.rentsService.downloadRentReceipt(this.estate()).pipe(
      take(1),
      tap(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'quittance.pdf'; // Set the desired file name
        a.click();
        window.URL.revokeObjectURL(url); // Cle
      })
    ).subscribe();
  }

  senddRentReceipt() {
    this.store.dispatch(senddRentReceipt({ estate: this.estate() }));
  }

  createLodger() {
    this.openCreateLodgerPopup();
  }

  setLodger(lodger?: Lodger | null) {
    this.store.dispatch(editEstate({ estate: { id: this.estate().id, lodger_id: lodger?.id ?? '' } }));
  }

  deleteLodger(lodger: Lodger) {
    this.store.dispatch(deleteLodgerInStore({ lodgerId: lodger.id }));
  }



}
