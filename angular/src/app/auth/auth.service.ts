import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
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
    return this.http.get(`${this.API_URL}/auth/google/callback?code=${code}`).pipe(
      tap(console.log),
      tap(({ user }) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
      })
    );
  }

  logout(): Observable<any> {
    return this.http.get(`${this.API_URL}/user/logout`).pipe(
      tap(() => {
        this.removeToken(this.getToken()!);
      })
    )
  }

  isAuthenticated(): Observable<any> {
    let token = localStorage.getItem('authToken');
    if (token) {
      return this.http.get(`${this.API_URL}/user/profile`);
    } else {
      return of(null);
    }
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  removeToken(token: string): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

}
