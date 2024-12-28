import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadProspections } from 'src/app/core/store/prospections.actions';
import { selectAllProspections } from 'src/app/core/store/prospections.selectors';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CreateProspectionComponent } from 'src/app/common/popups/create-prospection/create-prospection.component';

@Component({
  selector: 'app-prospections',
  templateUrl: './prospections.template.html',
  styleUrls: ['./prospections.component.css']
})
export class ProspectionsDesktopComponent {

  prospections = this.store.selectSignal(selectAllProspections);

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

}
