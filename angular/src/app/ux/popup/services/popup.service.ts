import { Injectable, TemplateRef, Type } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UxPopupService {

  constructor(protected modalService: NzModalService) { }

  openPopup(component: Type<any>, title: string, data?: any): Observable<any> {
    const modal = this.modalService.create({
      nzTitle: title,
      nzContent: component,
      nzFooter: null,
      nzData: data
    });
    return modal.afterClose.pipe(take(1));
  }

}
