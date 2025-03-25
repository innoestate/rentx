import { Directive } from '@angular/core';
import { Router } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { take, tap } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';

@Directive()
export class DashboardComponent {

  constructor(protected store: Store, protected authService: AuthService, protected router: Router, protected actions$: Actions) {  }

  logout() {
    this.authService.logout().pipe(
      take(1),
      tap(() => this.router.navigate(['/login']))
    ).subscribe();
  }

}
