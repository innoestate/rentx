import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { UiPopupService } from './popup.service';
import { UiPopupContinuable } from './ui-popup-continuable';
import { UiFormFieldData } from '../../components/ui-form/form-popup/models/ui-form.field-data.model';

@Injectable({
  providedIn: 'root'
})
export class DevPopupService extends UiPopupService {

  override openPopup(component: Type<any>, title: string, data?: any): Observable<any> {
    this.addTestSelectorOnNzCloseIcon();
    return super.openPopup(component, title, data);
  }

  override openContinuableFormPopup(title: string, fields: UiFormFieldData[], value?: any): UiPopupContinuable {
    this.addTestSelectorOnNzCloseIcon();
    return super.openContinuableFormPopup(title, fields, value);
  }

  private addTestSelectorOnNzCloseIcon() {
    setTimeout(() => {
      requestAnimationFrame(() => {
        const closeIcon = document.querySelector('.anticon-close');
        if (closeIcon) {
          closeIcon.setAttribute('test-selector', 'ui-popup-close-icon');
        }
      });
    }, 0)
  }

}
