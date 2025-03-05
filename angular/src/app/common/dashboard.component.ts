import { Directive } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { createEstateFailure } from '../estates/data/ngrx/estates.actions';

@Directive()
export class DashboardComponent {

  constructor(protected store: Store, protected authService: AuthService, protected router: Router, protected actions$: Actions, protected notification: NzNotificationService) {

    actions$.pipe(
      ofType(createEstateFailure),
      tap(( {error} ) => this.showError(error?.message))
    ).subscribe();

  }

  logout() {
    this.authService.logout().pipe(
      take(1),
      tap(() => this.router.navigate(['/login']))
    ).subscribe();
  }

  showError(message?: string): void {
    this.notification.error('Error', message ?? 'Une erreur est survenue.', {
      nzDuration: 3000,
      nzPlacement: 'topRight',
    });
  }

}
