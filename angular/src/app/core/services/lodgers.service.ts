import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Owner_Dto } from '../../core/models/dtos/owner.dto.model';
import { Lodger_Dto } from '../models/dtos/lodger.dto.model';
import { Lodger_Post } from '../models/requests/lodger-post-request.model';


@Injectable({
  providedIn: 'root'
})
export class LodgersService {

  private API_URL = environment.apiURL;

  constructor(private http: HttpClient) { }

  create(lodgers: Lodger_Post): Observable<Lodger_Dto> {
    return this.http.post<Lodger_Dto>(`${this.API_URL}/lodgers`, lodgers);
  }

  read(): Observable<Lodger_Dto[]> {
    return this.http.get<Lodger_Dto[]>(`${this.API_URL}/lodgers`);
  }

  update(lodgers: Lodger_Post): Observable<any> {
    return this.http.patch<any>(`${this.API_URL}/lodgers`, lodgers);
  }

  delete(lodgerId: string): Observable<any> {
    return this.http.delete<Owner_Dto>(`${this.API_URL}/lodgers`, {body: {id: lodgerId}}).pipe(
      map( result => lodgerId)
    )
  }
}
