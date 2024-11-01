import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';

interface User {
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
  accessToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:3000/auth';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private message: NzMessageService
  ) {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  initiateGoogleLogin(): void {
    window.location.href = `${this.API_URL}/google`;
  }

  handleGoogleCallback(code: string): Observable<any> {
    return this.http.get(`${this.API_URL}/google/callback?code=${code}`).pipe(
      tap(console.log)
      // tap(() => {
      //   next: (user: User) => {
      //     if (user) {
      //       localStorage.setItem('currentUser', JSON.stringify(user));
      //       this.currentUserSubject.next(user);
      //       this.message.success('Successfully logged in!');
      //     }
      //   },
      //   error: (error) => {
      //     this.message.error('Login failed. Please try again.');
      //   }
      // })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.message.success('Successfully logged out');
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }
}
