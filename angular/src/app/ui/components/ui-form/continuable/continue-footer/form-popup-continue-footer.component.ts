import { AfterViewInit, Component, input, OnDestroy, output } from '@angular/core';
import { UiButtonComponent } from 'src/app/ui/components/ui-button/ui-button.component';
import { UiFormFooterComponent } from '../../form-popup/components/footer/ui-form-footer.component';

@Component({
  selector: 'form-group-continue-footer',
  imports: [
    UiButtonComponent
  ],
  templateUrl: './form-popup-continue-footer.component.html',
  styleUrl: './form-popup-continue-footer.component.scss'
})
export class FormPopupContinueFooterComponent extends UiFormFooterComponent implements AfterViewInit, OnDestroy {

  continue = input.required<boolean>();
  onClose = output<void>();
}
