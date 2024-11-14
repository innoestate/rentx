import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceGuard implements CanActivate {
  constructor(
    private router: Router,
    private message: NzMessageService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (state.url.includes('desktop')) {
      console.log('in desktop');
      return true;
    }else if (state.url.includes('mobile')) {
      console.log('in mobile');
      return true;
    }else{
      this.router.navigate(['/desktop']);
      console.log('need to check device to redirect');
    }
    return true;
  }

}
