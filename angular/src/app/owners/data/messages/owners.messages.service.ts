import { Injectable, OnDestroy } from "@angular/core";
import { Actions, ofType } from "@ngrx/effects";
import { ActionCreator } from "@ngrx/store";
import { Subject, takeUntil, tap } from "rxjs";
import { UiMessageService } from "src/app/ui/services/message/message.service";
import { createOwnerFailure, createOwnerSuccess, deleteOwner, loadOwnersFailure, updateOwnerFailure, updateOwnerSuccess } from "./../ngrx/owners.actions";

@Injectable({
  providedIn: 'root'
})
export class OwnersMessagesService implements OnDestroy {

  private destroy$ = new Subject<void>();

  constructor(private message: UiMessageService, private actions$: Actions) {
    this.displayAsyncMessages();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private displayAsyncMessages() {

    this.displayFailureMessageOnAction(loadOwnersFailure, 'Échec de la chargement des propriétaires!');

    this.displaySuccessMessageOnAction(createOwnerSuccess, 'Propriétaire ajouté avec succès!');
    this.displayFailureMessageOnAction(createOwnerFailure, 'Échec de l\'ajout du propriétaire!');

    this.displaySuccessMessageOnAction(updateOwnerSuccess, 'Propriétaire mis à jour avec succès!');
    this.displayFailureMessageOnAction(updateOwnerFailure, 'Échec de la mise à jour du propriétaire!');

    this.displaySuccessMessageOnAction(deleteOwner, 'Propriétaire supprimé avec succès!');
    this.displayFailureMessageOnAction(deleteOwner, 'Échec de la suppression du propriétaire!');
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
