import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { map, merge, Observable, take, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private message: NzMessageService,
    private store: Store,
    private actions$: Actions
  ) { }

  canActivate(): Observable<boolean> | boolean {
    const success$ = this.actions$.pipe(
      ofType('[User] Load User Success'),
      map(() => true),
    );
    const failure$ = this.actions$.pipe(
      ofType('[User] Load User Failure'),
      map(() => {
        this.message.warning('Please login to access this page');
        this.router.navigate(['/desktop/login']);
        return false;
      })
    );
    this.store.dispatch({ type: '[User] Load User' });

    return merge(failure$, success$).pipe(
      tap(console.log),
      take(1)
    );
  }
}
