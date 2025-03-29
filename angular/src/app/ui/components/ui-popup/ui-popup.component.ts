import { CommonModule } from '@angular/common';
import { Component, model, output, signal } from '@angular/core';
import { LocalizationsService } from 'src/app/core/localizations/localizations.service';
import { UiButtonComponent } from 'src/app/ui/components/ui-button/ui-button.component';
import { UiFormFieldData } from 'src/app/ui/components/ui-form/models/ui-form.field-data.model';
import { UiFormComponent2 } from 'src/app/ui/components/ui-form/ui-form.component';
import { UiSpinnerComponent } from 'src/app/ui/components/ui-spinner/ui-spinner.component';

@Component({
  selector: 'app-ui-popup',
  imports: [UiButtonComponent, UiFormComponent2, CommonModule, UiSpinnerComponent],
  templateUrl: './ui-popup.component.html',
  styleUrl: './ui-popup.component.scss'
})
export class UiFormPopupComponent {

  protected validationButtonLabel = signal(this.localizations.getLocalization('commons', 'validationButton'));
  protected valid = signal(false);

  loading = signal(false);
  fields = model<UiFormFieldData[]>();
  values = model<any>();
  onValidate = output<void>();

  constructor(private localizations: LocalizationsService){}

  protected setValidStatus(valid: boolean){
    this.valid.set(valid);
  }

  protected validate(){
    this.onValidate.emit();
  }

}
