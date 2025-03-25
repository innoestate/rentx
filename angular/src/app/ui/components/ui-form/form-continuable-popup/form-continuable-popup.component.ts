import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormPopupBodyComponent } from '../form-popup/components/body/form-popup-body.component';
import { UiFormComponent } from '../form-popup/ui-form.component';
import { FormPopupContinueFooterComponent } from './continue-footer/form-popup-continue-footer.component';


@Component({
  selector: 'app-create-lodger-popup',
  imports: [
    CommonModule,
    FormPopupBodyComponent,
    FormPopupContinueFooterComponent
  ],
  templateUrl: './form-continuable-popup.component.html',
  styleUrls: ['./form-continuable-popup.component.scss'],
  standalone: true
})
export class FormContinuablePopupComponent<T extends Object> extends UiFormComponent<T> implements OnInit {

  showContinue = false;

  override validate() {
    if (this.formGroup.invalid)
      return;
    this.data.onValidate(this.formGroup.value as T, () => {
      this.showContinue = true;
    });
  }

  close(){
    this.nzModalRef.close();
  }

}
