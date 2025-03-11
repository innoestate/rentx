import { Injectable, OnDestroy } from "@angular/core";
import { Actions, ofType } from "@ngrx/effects";
import { ActionCreator } from "@ngrx/store";
import { Subject, takeUntil, tap } from "rxjs";
import { UiMessageService } from "src/app/ui/services/message/message.service";
import { createSellerFailure, createSellerSuccess, loadSellersFailure, removeSellerFailure, removeSellerSuccess, updateSellerFailure, updateSellerSuccess } from "../ngrx/sellers.actions";

@Injectable({
  providedIn: 'root'
})
export class SellersDataMessagesService implements OnDestroy{

  destroy$ = new Subject<void>();

  constructor(private message: UiMessageService, private actions$: Actions) {
    this.displayAsyncMessages();
  }

  displayAsyncMessages(){

    this.displayFailureMessageOnAction(loadSellersFailure, 'Echec de chargement des vendeurs!');

    this.displaySuccessMessageOnAction(createSellerSuccess, 'Vendeur ajouté avec succès!');
    this.displayFailureMessageOnAction(createSellerFailure, 'Echec de l\'ajout du vendeur!');

    this.displaySuccessMessageOnAction(updateSellerSuccess, 'Vendeur modifié avec succès!');
    this.displayFailureMessageOnAction(updateSellerFailure, 'Echec de la modification du vendeur!');

    this.displaySuccessMessageOnAction(removeSellerSuccess, 'Vendeur supprimé avec succès!');
    this.displayFailureMessageOnAction(removeSellerFailure, 'Echec de la suppression du vendeur!');
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