import { Component, output, signal } from '@angular/core';
import { UiFormPopupComponent } from '../ui-popup.component';
import { UiSpinnerComponent } from '../../ui-spinner/ui-spinner.component';
import { CommonModule } from '@angular/common';
import { UiFormComponent2 } from '../../ui-form/ui-form.component';
import { UiButtonComponent } from '../../ui-button/ui-button.component';

@Component({
  selector: 'ui-popup-continuable',
  imports: [UiButtonComponent, UiFormComponent2, CommonModule, UiSpinnerComponent],
  templateUrl: './ui-popup-continuable.component.html',
  styleUrl: './ui-popup-continuable.component.scss'
})
export class UiPopupContinuableComponent2 extends UiFormPopupComponent {

  continue = signal<boolean>(false);
  onClose = output<boolean>();

}
