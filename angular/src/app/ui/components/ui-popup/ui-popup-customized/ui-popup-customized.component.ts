import { Component, input, model, output, signal } from '@angular/core';
import { UiFormFieldData } from '../../ui-form/models/ui-form.field-data.model';
import { UiFormComponent2 } from '../../ui-form/ui-form.component';
import { UiButtonComponent } from '../../ui-button/ui-button.component';
import { UiButton } from '../../ui-button/models/ui-buttons.model';
import { UiSpinnerComponent } from '../../ui-spinner/ui-spinner.component';
import { UiFormPopupComponent } from '../ui-popup.component';

@Component({
  selector: 'app-ui-popup-customized',
  imports: [UiFormComponent2, UiButtonComponent, UiSpinnerComponent],
  templateUrl: './ui-popup-customized.component.html',
  styleUrl: './ui-popup-customized.component.scss'
})
export class UiPopupCustomizedComponent<T> extends UiFormPopupComponent{
  buttons: UiButton<T>[] = [];
  onClose = output<void>();

  click(button: UiButton<T>) {
    this.loading.set(true);
    button.command?.(this.values()!);
  }
}
