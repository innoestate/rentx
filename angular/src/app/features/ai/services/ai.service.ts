import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AiService {
  private readonly baseUrl = environment.aiURL;

  constructor(private http: HttpClient) {}

  getUserTokens(): Observable<{ tokens: number }> {
    return this.http.get<{ tokens: number }>(`${this.baseUrl}/tokens`);
  }

  getInvestorProfile(): Observable<{ profile: string[] }> {
    return this.http.get<{ profile: string[] }>(`${this.baseUrl}/investor/profile`);
  }
}
