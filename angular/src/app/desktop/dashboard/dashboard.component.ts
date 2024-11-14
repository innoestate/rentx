import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { take, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(private authService: AuthService, private router: Router){}

  logout(){
    this.authService.logout().pipe(
      take(1),
      tap(() => this.router.navigate(['/login']))
    ).subscribe();
  }

}
