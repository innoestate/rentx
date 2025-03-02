import { UiPopupService } from 'src/app/ui/popup/services/popup.service';
import { Command } from './command.interface';
import { CreateDesktopEstatePopupComponent } from 'src/app/common/popups/create-estate-popup/create-estate-popup.component';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreateEstateCommand implements Command {

  constructor(private popupService: UiPopupService) {}

  execute(): boolean {
    this.popupService.openPopup(CreateDesktopEstatePopupComponent, 'Ajouter un propriétaire');
    return true;
  }
}
