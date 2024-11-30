import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = environment.apiURL;

  TOKEN_KEY = 'authToken';

  constructor(
    private http: HttpClient,
  ) {}

  initiateGoogleLogin(): void {
    window.location.href = `${this.API_URL}/auth/google`;
  }

  handleGoogleCallback(code: string): Observable<any> {
    return this.http.get<{user:any}>(`${this.API_URL}/auth/google/callback?code=${code}`).pipe(
      tap(({ user }) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
      })
    );
  }

  logout(): Observable<any> {
    return of(true);//this.http.get(`${this.API_URL}/user/logout`);
  }

  isAuthenticated(token: string | null): Observable<any> {
    if (token) {
      return this.http.get(`${this.API_URL}/user/profile`).pipe(
        catchError(err => {
          this.removeToken(token);
          return of(err);
        })
      )
    } else {
      return of(null).pipe(delay(0));
    }
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  removeToken(token: string): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem('currentUser');
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

}
