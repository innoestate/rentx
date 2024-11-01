import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private message: NzMessageService
  ) {}

  canActivate(): Observable<boolean> | boolean {
    return this.authService.isAuthenticated().pipe(
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          this.message.warning('Please login to access this page');
          this.router.navigate(['/login']);
        }
      }),
      map(()=> true)
    );
  }
}
