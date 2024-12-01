import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RentsService {

  private API_URL = environment.apiURL;

  constructor(private http: HttpClient) { }

  downloadRentReceipt(estateId: string, startDate?: string, endDate?: string): Observable<any> {

    let queryParams = `estate=${estateId}`;
    if (startDate) {
      queryParams += `&startDate=${startDate}`;
    }
    if (endDate) {
      queryParams += `&endDate=${endDate}`;
    }

    return this.http.get<any>(`${this.API_URL}/rents/pdf?${queryParams}`, { responseType: 'blob' as 'json' });
  }

  sendRentReceipt(estateId: string, startDate?: string, endDate?: string): Observable<any> {

    let queryParams = `estate=${estateId}`;
    if (startDate) {
      queryParams += `&startDate=${startDate}`;
    }
    if (endDate) {
      queryParams += `&endDate=${endDate}`;
    }

    return this.http.get<any>(`${this.API_URL}/rents/email?${queryParams}`);
  }
}
