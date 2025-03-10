import { Injectable, OnDestroy } from "@angular/core";
import { Actions, ofType } from "@ngrx/effects";
import { ActionCreator } from "@ngrx/store";
import { Subject, takeUntil, tap } from "rxjs";
import { UiMessageService } from "src/app/ui/services/message/message.service";
import { createProspectionFailure, createProspectionSuccess, loadProspectionsFailure, removeProspectionFailure, removeProspectionSuccess, updateProspectionFailure, updateProspectionSuccess } from "../ngrx/prospections.actions";

@Injectable({
  providedIn: 'root'
})
export class ProspectionsDataMessagesService implements OnDestroy{

  destroy$ = new Subject<void>();

  constructor(private message: UiMessageService, private actions$: Actions) {
    this.displayAsyncMessages();
  }

  displayAsyncMessages(){

    this.displayFailureMessageOnAction(loadProspectionsFailure, 'Echec de chargement des prospections!');

    this.displaySuccessMessageOnAction(createProspectionSuccess, 'Prospection ajoutée avec succès!');
    this.displayFailureMessageOnAction(createProspectionFailure, 'Echec de l\'ajout de la prospection!');

    this.displaySuccessMessageOnAction(updateProspectionSuccess, 'Prospection modifiée avec succès!');
    this.displayFailureMessageOnAction(updateProspectionFailure, 'Echec de la modification de la prospection!');

    this.displaySuccessMessageOnAction(removeProspectionSuccess, 'Prospection supprimée avec succès!');
    this.displayFailureMessageOnAction(removeProspectionFailure, 'Echec de la suppression de la prospection!');
  }

  private displaySuccessMessageOnAction(action: ActionCreator, message: string){
    this.actions$.pipe(
      takeUntil(this.destroy$),
      ofType(action),
      tap(() => this.message.success(message))
    ).subscribe();
  }

  private displayFailureMessageOnAction(action: ActionCreator, message: string){
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
