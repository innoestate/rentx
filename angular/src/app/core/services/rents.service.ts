import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Estate } from '../models/estate.model';


@Injectable({
  providedIn: 'root'
})
export class RentsService {

  private API_URL = environment.apiURL;

  constructor(private http: HttpClient) { }

  downloadRentReceipt(estate: Estate): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/rents/pdf?estate=${estate.id}`, { responseType: 'blob' as 'json' });
  }

  sendRentReceipt(estate: Estate): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/rents/email?estate=${estate.id}`);
  }
}
