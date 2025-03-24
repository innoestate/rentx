import { Injectable, OnDestroy } from "@angular/core";
import { Actions, ofType } from "@ngrx/effects";
import { ActionCreator } from "@ngrx/store";
import { Subject, takeUntil, tap } from "rxjs";
import { UiMessageService } from "src/app/ui/services/message/message.service";
import { LocalizationsService } from "../../localizations/localizations.service";

@Injectable({
  providedIn: 'root'
})
export class DataMessagesService implements OnDestroy{

  destroy$ = new Subject<void>();

  constructor(private message: UiMessageService, private actions$: Actions, protected localizationService: LocalizationsService) {
    this.displayAsyncMessages();
  }

  displayAsyncMessages(){}

  protected displaySuccessMessageOnAction(action: ActionCreator, message: string){
    this.actions$.pipe(
      takeUntil(this.destroy$),
      ofType(action),
      tap(() => this.message.success(message))
    ).subscribe();
  }

  protected displayFailureMessageOnAction(action: ActionCreator, message: string){
    this.actions$.pipe(
      takeUntil(this.destroy$),
      ofType(action),
      tap(() => this.message.error(message))
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }
}