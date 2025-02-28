import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateDesktopEstatePopupComponent } from 'src/app/common/popups/create-estate-popup/create-estate-popup.component';
import { CreateOwnerPopupComponent } from 'src/app/common/popups/create-owner-popup/create-owner-popup.component';
import { UxPopupService } from 'src/app/ux/popup/services/popup.service';

@Component({
    selector: 'app-estates',
    templateUrl: './estates.component.html',
    styleUrl: './estates.component.scss',
    standalone: false
})
export class EstatesPageDesktopComponent {

  constructor(protected popupService: UxPopupService) { }

  openCreateEstatePopup(): Observable<any> {
    return this.popupService.openPopup(CreateDesktopEstatePopupComponent, 'Créer un nouveau bien');
  }

  openCreateOwnerPopup(): Observable<any> {
    return this.popupService.openPopup(CreateOwnerPopupComponent, 'Créer un nouveau propriétaire');
  }

}
