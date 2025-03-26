import { Subject } from "rxjs";

export class UiPopup {

  onClose = new Subject();

  close(value: any) {
    this.onClose.next(value);
    this.completeObservables();
  }

  completeObservables(){
    this.onClose.complete();
  }

}