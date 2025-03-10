import { Injectable, OnDestroy } from "@angular/core";
import { Actions, ofType } from "@ngrx/effects";
import { ActionCreator } from "@ngrx/store";
import { Subject, takeUntil, tap } from "rxjs";
import { UiMessageService } from "src/app/ui/services/message/message.service";
import { createEstateFailure, createEstateSuccess, deleteEstateFailure, deleteEstateSuccess, editEstateFailure, editEstateSuccess, loadEstatesFailure } from "../ngrx/estates.actions";

@Injectable({
  providedIn: 'root'
})
export class EstatesDataMessagesService implements OnDestroy{

  destroy$ = new Subject<void>();

  constructor(private message: UiMessageService, private actions$: Actions) {
    console.log('estate messageService constructor');
    this.displayAsyncMessages();
  }

  displayAsyncMessages(){

    this.displayFailureMessageOnAction(loadEstatesFailure, 'Echec de chargement des biens!');

    this.displaySuccessMessageOnAction(createEstateSuccess, 'Bien ajouté avec succès!');
    this.displayFailureMessageOnAction(createEstateFailure, 'Echec de l\'ajout du bien!');

    this.displaySuccessMessageOnAction(editEstateSuccess, 'Bien modifié avec succès!');
    this.displayFailureMessageOnAction(editEstateFailure, 'Echec de la modification du bien!');

    this.displaySuccessMessageOnAction(deleteEstateSuccess, 'Bien supprimé avec succès!');
    this.displayFailureMessageOnAction(deleteEstateFailure, 'Echec de la suppression du bien!');
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
    this.destroy$.unsubscribe();
  }

}
