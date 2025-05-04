import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OffersEmailHttpService {
  private readonly apiUrl = environment.apiURL;

  constructor(private http: HttpClient) { }

  sendOfferPdf(prospectionId: string, pdfFile: string, emailBody: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/offers/send-pdf/${prospectionId}`, {
      pdfFile,
      emailBody
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    });
  }
}
