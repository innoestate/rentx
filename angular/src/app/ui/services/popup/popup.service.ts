import { Injectable, Type } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Observable, Subject, take, tap } from 'rxjs';
import { UiFormContinuableComponent2 } from '../../components/ui-form/continuable/form-continuable-popup.component';
import { UiFormContinuableComponent } from '../../components/ui-form/form-continuable-popup/form-continuable-popup.component';
import { UiFormFieldData } from '../../components/ui-form/form-popup/models/ui-form.field-data.model';
import { UiFormComponent } from '../../components/ui-form/form-popup/ui-form.component';
import { UiPopup } from './ui-popup';
import { UiPopupContinuable } from './ui-popup-continuable';

@Injectable({
  providedIn: 'root'
})
export class UiPopupService {

  constructor(protected modalService: NzModalService) {
    console.log('UiPopupService constructor');
  }

  openPopup(component: Type<any>, title: string, data?: any): Observable<any> {
    const subject = new Subject<any>();
    const modal = this.modalService.create({
      nzTitle: title,
      nzContent: component,
      nzFooter: null,
      nzData: data
    });
    modal.afterClose.pipe(
      take(1),
      tap(value => subject.next(value))
    ).subscribe();
    return subject;
  }

  // openPopup(component: Type<any>, title: string, data?: any): Observable<any> {
  //   const modal = this.modalService.create({
  //     nzTitle: title,
  //     nzContent: component,
  //     nzFooter: null,
  //     nzData: data
  //   });
  //   return modal.afterClose.pipe(take(1));
  // }

  openFormPopup(title: string, data?: any): Observable<any> {
    return this.openPopup(UiFormComponent, title, data)
  }

  openContinuableFormPopup(title: string, fields: UiFormFieldData[], value?: any): UiPopupContinuable {

    const uiPopup = new UiPopupContinuable();
    const modal = this.createModal(title, UiFormContinuableComponent2);
    const uiForm = modal.componentInstance as UiFormContinuableComponent2<any>;

    uiForm.fields.set(fields);
    uiForm.onValidate.subscribe(values => uiPopup.validate(values));
    uiForm.onSubmit.subscribe(value => this.closePopup(value, uiPopup, modal));

    uiPopup.onEnableContinuation.subscribe(() => uiForm.enableContinuation());


    return uiPopup;
  }

  private createModal(title: string, component: any) {
    return this.modalService.create({
      nzTitle: title,
      nzContent: component,
      nzFooter: null,
    })
  }

  private closePopup(value: any,popup: UiPopup, modal: NzModalRef) {
    popup.close(value);
    modal.close();
  }

}
