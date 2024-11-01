import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.scss'
})

export class CallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['code']) {
        this.authService.handleGoogleCallback(params['code'])
          .subscribe({
            next: () => this.router.navigate(['/dashboard']),
            error: () => this.router.navigate(['/login'])
          });
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}
