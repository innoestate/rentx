import { Injectable, TemplateRef, Type } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(private modalService: NzModalService) { }

  openPopup(component: Type<any>, title: string, data?: any): Observable<any> {
    return this.modalService.create({
      nzTitle: title,
      nzContent: component,
      nzFooter: null,
      nzData: data
    }).afterClose.pipe(
      take(1)
    );
  }

}
