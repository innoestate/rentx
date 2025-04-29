import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OfferDto } from '../../models/offer.dto.model';
import { environment } from '../../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class OffersHttpService {
    private readonly apiUrl = `${environment.apiURL}/offers`;

    constructor(private http: HttpClient) {}

    getOffersByProspectionId(prospectionId: string): Observable<OfferDto[]> {
        return this.http.get<OfferDto[]>(`${this.apiUrl}/by-prospection/${prospectionId}`);
    }

    createOffer(offer: OfferDto): Observable<OfferDto> {
        return this.http.post<OfferDto>(this.apiUrl, offer);
    }

    updateOffer(offer: Partial<OfferDto>): Observable<OfferDto> {
        return this.http.patch<OfferDto>(`${this.apiUrl}/${offer.id}`, offer);
    }

    deleteOffer(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
