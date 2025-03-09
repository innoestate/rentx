import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})
export class UiMessageService {

  constructor(private nzMessageService: NzMessageService) { }

  success(message: string): void {
    this.nzMessageService.success(message);
  }

  error(message: string): void {
    this.nzMessageService.error(message);
  }

  info(message: string): void {
    this.nzMessageService.info(message);
  }

  warning(message: string): void {
    this.nzMessageService.warning(message);
  }

}
