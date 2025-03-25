import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { AuthService } from "src/app/core/auth/auth.service";

@Injectable()
export class UserEffects {

  constructor(private actions$: Actions, private authService: AuthService, private router: Router) { }

  loadUser$ = createEffect(() => this.actions$.pipe(
    ofType('[User] Load User'),
    map(() => localStorage.getItem('authToken')),
    switchMap(token => this.authService.isAuthenticated(token as string | null)),
    map( user => user?({ type: '[User] Load User Success', user }):({ type: '[User] Load User Failure' })),
    catchError(() => {
      return of({ type: '[User] Load User Failure' });
    })
  ));

  logOut$ = createEffect(() => this.actions$.pipe(
    ofType('[User] Log Out'),
    switchMap(() => this.authService.logout()),
    tap(() => localStorage.removeItem('authToken')),
    map(() => ({ type: '[User] Log Out Success' })),
    tap(() => this.router.navigate(['/login'])),
    catchError(() => of({ type: '[User] Log Out Failure' }))
  ));

}
