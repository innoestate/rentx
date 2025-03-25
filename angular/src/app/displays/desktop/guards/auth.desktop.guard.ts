import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { UserDataService } from 'src/app/features/user/data/service/user.data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthDesktopGuard implements CanActivate {
  constructor(
    private router: Router,
    private dataService: UserDataService
  ) { }

  canActivate(): Observable<boolean> | boolean {
    return this.loadUser(err => this.navigateToLogin());
  }

  private loadUser(failLoading: (err?: Error) => void) {
    return this.dataService.loadUser().pipe(
      map(() => true),
      catchError(err => {
        failLoading(err);
        return of(err);
      })
    );
  }

  private navigateToLogin() {
    this.router.navigate(['/desktop/login']);
  }
}
