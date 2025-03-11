import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginMobileGuard implements CanActivate {
  constructor(
    private router: Router
  ) {}

  canActivate(): Observable<boolean> | boolean {
    if(localStorage.getItem('authToken')){
      this.router.navigate(['/mobile/me']);
    }
    return true;
  }

}
