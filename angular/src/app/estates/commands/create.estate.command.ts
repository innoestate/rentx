import { UxPopupService } from 'src/app/ux/popup/services/popup.service';
import { Command } from './command.interface';
import { CreateDesktopEstatePopupComponent } from 'src/app/common/popups/create-estate-popup/create-estate-popup.component';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreateEstateCommand implements Command {

  constructor(private popupService: UxPopupService) {}

  execute(): boolean {
    this.popupService.openPopup(CreateDesktopEstatePopupComponent, 'Ajouter un propriétaire');
    return true;
  }
}
