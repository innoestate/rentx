import { Injectable, Type } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable, take } from 'rxjs';
import { UiFormFieldData } from '../../components/ui-form/models/ui-form.field-data.model';
import { UiPopupContinuableComponent2 } from '../../components/ui-popup/ui-popup-continuable/ui-popup-continuable.component';
import { UiFormPopupComponent } from '../../components/ui-popup/ui-popup.component';

@Injectable({
  providedIn: 'root'
})
export class UiPopupService {

  constructor(protected modalService: NzModalService) {
    console.log('UiPopupService constructor');
  }

  openPopup(component: Type<any>, title: string, data?: any): Observable<any> {
    const modal = this.modalService.create({
      nzTitle: title,
      nzContent: component,
      nzFooter: null,
      nzData: data,
      nzBodyStyle: { /* custom styles if needed */ },
    });
    return modal.afterClose.pipe(take(1));
  }

  openFormPopup<T>(action: (value: T) => Promise<T>, title: string, fields: UiFormFieldData[], value?: T): UiFormPopupComponent {
    const modal = this.createModal(title, UiFormPopupComponent);
    const popup = modal.componentInstance as UiFormPopupComponent;

    popup.fields.set(fields);
    popup.values.set(value);
    popup.onValidate.subscribe(() => {
      popup.loading.set(true);
      action(popup.values())
        .then(() => modal.close())
        .finally(() => popup.loading.set(false));
    });

    return popup;
  }

  openContinuableFormPopup<T>(action: (value: T) => Promise<T>, title: string, fields: UiFormFieldData[], values?: any): UiPopupContinuableComponent2 {

    const modal = this.createModal(title, UiPopupContinuableComponent2);
    const popup = modal.componentInstance as UiPopupContinuableComponent2;

    popup.fields.set(fields);
    if (values) {
      popup.values.set(values);
    }
    popup.onValidate.subscribe(() => {
      popup.loading.set(true);
      action(popup.values())
      .then(() => {
        popup.continue.set(true);
      })
      .finally(() => {
        popup.loading.set(false);
      });
    });

    popup.onClose.subscribe(() => {
      modal.close();
    });


    return popup;
  }

  private createModal(title: string, component: any) {
    return this.modalService.create({
      nzTitle: title,
      nzContent: component,
      nzFooter: null,
    })
  }

}
