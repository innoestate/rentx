import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { UiPopupService } from './popup.service';

@Injectable({
  providedIn: 'root'
})
export class DevPopupService extends UiPopupService {

  override openPopup(component: Type<any>, title: string, data?: any): Observable<any> {
    this.addTestSelectorOnNzCloseIcon();
    return super.openPopup(component, title, data);
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
