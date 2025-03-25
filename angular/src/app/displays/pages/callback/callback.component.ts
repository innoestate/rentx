import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
    selector: 'app-callback',
    templateUrl: './callback.component.html',
    styleUrl: './callback.component.scss',
    standalone: false
})

export class CallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['code']) {
        this.authService.handleGoogleCallback(params['code']).pipe(
          tap(data => {
            this.authService.setToken(data.token);
          })
        ).subscribe({
          next: () => this.router.navigate(['/desktop/me/dashboard']),
          error: () => this.router.navigate(['/login'])
        });
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}
