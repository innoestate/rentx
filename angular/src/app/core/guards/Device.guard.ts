import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { map, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceGuard implements CanActivate {
  constructor(
    private router: Router,
    private deviceDetector: DeviceDetectorService,
    private auth: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (state.url.includes('desktop')) {
      if (this.deviceDetector.isMobile()) {
        const newUrl = state.url.replace('desktop', 'mobile');
        this.router.navigate([newUrl]);
        return false;
      }
      return true;
    }else if (state.url.includes('mobile')) {
      if(!this.deviceDetector.isMobile()){
        const newUrl = state.url.replace('mobile', 'desktop');
        this.router.navigate([newUrl]);
        return false;
      }
      return true;
    }else{
      return this.auth.isAuthenticated(this.auth.getToken()).pipe(
        map(isAuth => {
          if(isAuth){
            if(this.deviceDetector.isMobile()){
              this.router.navigate(['/mobile/me'])
            }else{
              this.router.navigate(['/desktop/me'])
            }
            return false;
          }
          return true;
        })
      )
    }
  }

}
