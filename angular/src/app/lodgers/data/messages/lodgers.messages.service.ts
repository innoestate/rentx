import { Injectable, OnDestroy } from "@angular/core";
import { Actions, ofType } from "@ngrx/effects";
import { ActionCreator } from "@ngrx/store";
import { Subject, takeUntil, tap } from "rxjs";
import { UiMessageService } from "src/app/ui/services/message/message.service";
import { createLodgerFailure, createLodgerSuccess, deleteLodger, deleteLodgerFailure, deleteLodgerSuccess, loadLodgersFailure, updateLodgerFailure, updateLodgerSuccess } from "../ngrx/lodgers.actions";

@Injectable({
  providedIn: 'root'
})
export class LodgersDataMessagesService implements OnDestroy {

  private destroy$ = new Subject<void>();

  constructor(private message: UiMessageService, private actions$: Actions) {
    console.log('lodger message service constructor')
    this.displayAsyncMessages();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private displayAsyncMessages() {
    this.displayFailureMessageOnAction(loadLodgersFailure, 'Échec de chargement des locataires!');

    this.displaySuccessMessageOnAction(createLodgerSuccess, 'Locataire ajouté avec succès!');
    this.displayFailureMessageOnAction(createLodgerFailure, 'Échec de l\'ajout du locataire!');

    this.displaySuccessMessageOnAction(updateLodgerSuccess, 'Locataire mis à jour avec succès!');
    this.displayFailureMessageOnAction(updateLodgerFailure, 'Échec de la mise à jour du locataire!');

    this.displaySuccessMessageOnAction(deleteLodgerSuccess, 'Locataire supprimé avec succès!');
    this.displayFailureMessageOnAction(deleteLodgerFailure, 'Échec de la suppression du locataire!');
  }

  private displaySuccessMessageOnAction(action: ActionCreator, message: string) {
    this.actions$.pipe(
      takeUntil(this.destroy$),
      ofType(action),
      tap(() => this.message.success(message))
    ).subscribe();
  }

  private displayFailureMessageOnAction(action: ActionCreator, message: string) {
    this.actions$.pipe(
      takeUntil(this.destroy$),
      ofType(action),
      tap(() => this.message.error(message))
    ).subscribe();
  }
}
