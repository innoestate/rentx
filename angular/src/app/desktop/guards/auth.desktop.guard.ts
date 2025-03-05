import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { delay, map, merge, Observable, take } from 'rxjs';
import { loadUser } from 'src/app/core/store/user/user.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthDesktopGuard implements CanActivate {
  constructor(
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
    this.store.dispatch(loadUser());

    return merge(failure$, success$).pipe(
      take(1)
    );
  }
}
