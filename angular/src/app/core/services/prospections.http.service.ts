import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Prospection_Dto } from '../models/dtos/prospection.dto.model';

@Injectable({
  providedIn: 'root'
})
export class ProspectionsHttpService {
  private apiUrl = `${environment.apiURL}/prospections`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Prospection_Dto[]> {
    return this.http.get<Prospection_Dto[]>(`${this.apiUrl}`);
  }

  getById(id: string): Observable<Prospection_Dto> {
    return this.http.get<Prospection_Dto>(`${this.apiUrl}/${id}`);
  }

  create(data: Prospection_Dto): Observable<Prospection_Dto> {
    return this.http.post<Prospection_Dto>(`${this.apiUrl}`, data);
  }

  update(id: string, data: Partial<Prospection_Dto>): Observable<Prospection_Dto> {
    return this.http.put<Prospection_Dto>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: string): Observable<Prospection_Dto> {
    return this.http.delete<Prospection_Dto>(`${this.apiUrl}/${id}`);
  }
}
