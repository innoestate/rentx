import { Injectable, OnDestroy } from "@angular/core";
import { Actions, ofType } from "@ngrx/effects";
import { ActionCreator } from "@ngrx/store";
import { Subject, takeUntil, tap } from "rxjs";
import { UiMessageService } from "src/app/ui/services/message/message.service";
import { createLodgerFailure, createLodgerSuccess, deleteLodger, loadLodgersFailure, updateLodgerFailure, updateLodgerSuccess } from "src/app/core/store/lodger/lodgers.actions";

@Injectable({
  providedIn: 'root'
})
export class LodgersMessagesService implements OnDestroy {

  private destroy$ = new Subject<void>();

  constructor(private message: UiMessageService, private actions$: Actions) {
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

    this.displaySuccessMessageOnAction(deleteLodger, 'Locataire supprimé avec succès!');
    this.displayFailureMessageOnAction(deleteLodger, 'Échec de la suppression du locataire!');
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
