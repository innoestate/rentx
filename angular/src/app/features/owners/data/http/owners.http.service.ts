import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Owner_Dto } from '../../models/owner.dto.model';
import { Owner_Post_Request } from '../../models/owner-post-request.model';
import { Owner } from 'src/app/features/owners/models/owner.model';


@Injectable({
  providedIn: 'root'
})
export class OwnersHttpService {

  private API_URL = environment.apiURL;

  constructor(private http: HttpClient) { }

  get(): Observable<Owner_Dto[]> {
    return this.http.get<Owner_Dto[]>(`${this.API_URL}/owners`);
  }

  create(owner: Owner_Post_Request): Observable<Owner_Dto> {
    return this.http.post<Owner_Dto>(`${this.API_URL}/owners`, owner);
  }

  edit(owner: Partial<Owner>): Observable<any> {
    return this.http.patch<Owner_Dto>(`${this.API_URL}/owners`, owner).pipe(
      map( () => owner)
    )
  }

  delete(ownerId: string): Observable<any> {
    return this.http.delete<Owner_Dto>(`${this.API_URL}/owners`, {body: {id: ownerId}}).pipe(
      map( result => ownerId)
    )
  }
}
