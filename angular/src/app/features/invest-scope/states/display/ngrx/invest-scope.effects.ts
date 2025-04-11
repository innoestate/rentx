import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { addDisplayedComponent } from "./invest-scope.actions";
import { switchMap } from "rxjs";

@Injectable()
export class InvestScopeEffects {

  constructor(private actions$: Actions) { }

}