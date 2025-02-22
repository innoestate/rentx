import { Component } from '@angular/core';
import { EstatePage } from 'src/app/common/pages/estates.page.component';
import { CreateOwnerPopupComponent } from 'src/app/common/popups/create-owner-popup/create-owner-popup.component';

@Component({
  selector: 'app-estates-table',
  templateUrl: './estates-table.component.html',
  styleUrl: './estates-table.component.scss',
  standalone: false
})
export class EstatesTableComponent extends EstatePage {

  pageSize: number = 8;

  override ngOnInit() {
    this.calculatePageSize();
    super.ngOnInit();
  }

  openCreateOwnerPopup(){
    this.popupService.openPopup(CreateOwnerPopupComponent, 'Ajouter un nouveau propriétaire')
  }

  calculatePageSize() {
    const totalHeight = window.innerHeight - 250;
    const rowHeight = 64;
    this.pageSize = Math.floor(totalHeight / rowHeight) ;
  }

}

