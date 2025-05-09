import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InvestorProfileResponse } from '../models/investor-profile-field.interface';

interface BuildInvestorProfileResponse {
  iaPrompt: string;
  fields: Record<string, any>;
}

@Injectable({
  providedIn: 'root'
})
export class AiHttpService {
  private readonly baseUrl = environment.aiURL;

  constructor(private http: HttpClient) { }

  getUserTokens(): Observable<{ tokens: number }> {
    return this.http.get<{ tokens: number }>(`${this.baseUrl}/tokens`);
  }

  getInvestorProfile(): Observable<InvestorProfileResponse> {
    return this.http.get<InvestorProfileResponse>(`${this.baseUrl}/investor/profile`);
  }

  buildInvestorProfile(prompt: string): Observable<BuildInvestorProfileResponse> {
    return this.http.post<BuildInvestorProfileResponse>(`${this.baseUrl}/investor/profile`, { userPrompt: prompt });
  }
}
