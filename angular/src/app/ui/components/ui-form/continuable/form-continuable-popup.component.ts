import { CommonModule } from '@angular/common';
import { Component, OnInit, output, signal } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { UiFormBodyComponent } from '../form-popup/components/body/ui-form-body.component';
import { UiFormObject } from '../form-popup/models/ui-form.model';
import { UiFormComponent2 } from '../ui-form.component';
import { FormPopupContinueFooterComponent } from './continue-footer/form-popup-continue-footer.component';


@Component({
  selector: 'app-create-lodger-popup',
  imports: [
    CommonModule,
    UiFormBodyComponent,
    FormPopupContinueFooterComponent
  ],
  templateUrl: './form-continuable-popup.component.html',
  styleUrls: ['./form-continuable-popup.component.scss'],
  standalone: true
})
export class UiFormContinuableComponent2<T extends Object> extends UiFormComponent2<T> implements OnInit {

  showContinue = signal(false);
  onValidate = output<{ [K in keyof UiFormObject]: AbstractControl<any, any> }>()

  validate() {
    if (this.formGroup.invalid)
      return;
    this.onValidate.emit(this.formGroup.value);
  }

  enableContinuation() {
    this.showContinue.set(true);
  }

}
