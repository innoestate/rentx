import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RentsHttpService {

  private API_URL = environment.apiURL;

  constructor(private http: HttpClient) { }

  fetchMonthlyRents(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/rents`);
  }

  downloadRentReceipt(estateId: string | undefined, startDate?: string, endDate?: string): Observable<any> {

    if(!estateId) throw new Error('Estate id is required');

    let queryParams = `estate=${estateId}`;
    if (startDate) {
      queryParams += `&startDate=${startDate}`;
    }
    if (endDate) {
      queryParams += `&endDate=${endDate}`;
    }

    return this.http.get<any>(`${this.API_URL}/rents/pdf?${queryParams}`, { responseType: 'blob' as 'json' });
  }

  sendRentReceiptByEmail(estateId: string | undefined, startDate?: string, endDate?: string): Observable<any> {

    if(!estateId) throw new Error('Estate id is required');

    let queryParams = `estate=${estateId}`;
    if (startDate) {
      queryParams += `&startDate=${startDate}`;
    }
    if (endDate) {
      queryParams += `&endDate=${endDate}`;
    }

    return this.http.get<any>(`${this.API_URL}/rents/email?${queryParams}`);
  }

  synchronizeGoogleSheet(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/rents/sheets`);
  }
}
