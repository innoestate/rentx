import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Lodger_Dto } from '../../models/lodger.dto.model';
import { Lodger_Post } from '../../models/lodger-post-request.model';
import { Lodger_Patch } from '../../models/lodger-patch-request.model';
import { Owner_Dto } from 'src/app/features/owners/models/owner.dto.model';


@Injectable({
  providedIn: 'root'
})
export class LodgersHttpService {

  private API_URL = environment.apiURL;

  constructor(private http: HttpClient) { }

  create(lodgers: Lodger_Post): Observable<Lodger_Dto> {
    return this.http.post<Lodger_Dto>(`${this.API_URL}/lodgers`, lodgers);
  }

  read(): Observable<Lodger_Dto[]> {
    return this.http.get<Lodger_Dto[]>(`${this.API_URL}/lodgers`);
  }

  update(lodgers: Lodger_Patch): Observable<any> {
    return this.http.patch<any>(`${this.API_URL}/lodgers`, lodgers);
  }

  delete(lodgerId: string): Observable<any> {
    return this.http.delete<Owner_Dto>(`${this.API_URL}/lodgers`, { body: { id: lodgerId } }).pipe(
      map(() => lodgerId),
    )
  }
}
