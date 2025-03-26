import { catchError, filter, Observable, of, Subject, switchMap, tap } from "rxjs";
import { UiPopup } from "./ui-popup";

export class UiPopupContinuable extends UiPopup {

  onValidate = new Subject();
  onEnableContinuation = new Subject();

  performOnValidation(perform:(value: any) => Observable<any>) {
    this.onValidate.pipe(
      switchMap(value => perform(value).pipe(catchError(()=>of(null)))),
      filter(Boolean),
      tap(() =>  this.enableContinuation())
    ).subscribe();
  }

  override close(value: any) {
    super.close(value);
    this.completeObservables();
  }

  validate(value: any) {
    this.onValidate.next(value);
  }

  enableContinuation(){
    this.onEnableContinuation.next(true);
  }

  override completeObservables(){
    super.completeObservables();
    this.onValidate.complete();
    this.onEnableContinuation.complete();
  }

}