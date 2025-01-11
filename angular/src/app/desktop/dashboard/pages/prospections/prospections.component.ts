import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadProspections, removeProspection, updateProspection } from 'src/app/core/store/prospections/prospections.actions';
import { selectAllProspections } from 'src/app/core/store/prospections/prospections.selectors';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CreateProspectionComponent } from 'src/app/common/popups/create-prospection/create-prospection.component';
import { CreateSellerPopupComponent } from 'src/app/common/popups/create-seller-popup/create-seller-popup.component';
import { Prospection } from 'src/app/core/models/prospection.model';
import { PropertyStatusTypes, PROSPECTION_STATUS, ProspectionStatus } from 'src/app/core/models/dtos/prospection.dto.model';

@Component({
  selector: 'app-prospections',
  templateUrl: './prospections.template.html',
  styleUrls: ['./prospections.component.css']
})
export class ProspectionsDesktopComponent {

  prospections = this.store.selectSignal(selectAllProspections);
  prospectionStatuses: ProspectionStatus[] = PROSPECTION_STATUS;
  editId!: string | null;
  hoveredRow: any = null;
  editLink = false;

  constructor(private store: Store, private modalService: NzModalService) {
    this.store.dispatch(loadProspections());
  }

  openCreatePropspectionPopup() {
    this.modalService.create({
      nzTitle: 'Create Prospection',
      nzContent: CreateProspectionComponent,
      nzFooter: null
    });
  }

  openCreateSellerPopup() {
    this.modalService.create({
      nzTitle: 'Create Seller',
      nzContent: CreateSellerPopupComponent,
      nzFooter: null
    });
  }

  remove(prospection: Prospection) {
    if (prospection.id == null) {
      return;
    }
    this.store.dispatch(removeProspection({ id: prospection.id }));
  }

  setStatus(prospection: Prospection, status: PropertyStatusTypes) {
    if (prospection.id == null) {
      return;
    }
    this.store.dispatch(updateProspection({id: prospection.id, changes: {status: status}}));
  }

  startEdit(id: string, ref: HTMLInputElement) {
    this.editId = id;
    setTimeout(() => {
      requestAnimationFrame(() => {
        ref.focus();
      })
    }, 0);
  }

  edit(prospection: Prospection, fieldName: string, ref: HTMLInputElement) {
    if (prospection.id == null) {
      return;
    }
    const editableProspection: any = { id: prospection.id };
    editableProspection[fieldName] = ref.value;
    this.store.dispatch(updateProspection({ id: prospection.id, changes: editableProspection }));
  }

  stopEdit() {
    this.editId = null;
  }

}
