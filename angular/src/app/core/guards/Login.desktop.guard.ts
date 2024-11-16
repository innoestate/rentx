import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginDesktopGuard implements CanActivate {
  constructor(
    private router: Router
  ) {}

  canActivate(): Observable<boolean> | boolean {
    if(localStorage.getItem('authToken')){
      this.router.navigate(['/desktop/me']);
    }
    return true;
  }

}
