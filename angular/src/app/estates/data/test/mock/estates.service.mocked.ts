import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Estate_Dto } from 'src/app/core/models/dtos/estate.dto.model';
import { Estate_Post_Request } from 'src/app/estates/models/estate-post-request.model';

@Injectable({
  providedIn: 'root'
})
export class MockEstatesService {
  public estates: Estate_Dto[] = [
    { id: '1', street: 'Street 1', city: 'City 1', zip: '12345', owner_id: 'owner1', lodger_id: 'lodger1' },
    { id: '2', street: 'Street 2', city: 'City 2', zip: '67890', owner_id: 'owner2', lodger_id: 'lodger2' }
  ];

  getEstates(): Observable<Estate_Dto[]> {
    return of([...this.estates]).pipe(delay(0));
  }

  create(estate: Estate_Post_Request): Observable<Estate_Dto> {
    const newEstate: Estate_Dto = {
      id: (this.estates.length + 1).toString(),
      street: estate.street,
      city: estate.city,
      zip: estate.zip,
      owner_id: estate.owner_id ?? undefined,
      lodger_id: estate.lodger_id ?? undefined
    };

    this.estates = [...this.estates, newEstate];
    return of(newEstate);
  }

  editEstate(estate: Estate_Dto): Observable<Estate_Dto> {
    const index = this.estates.findIndex(e => e.id === estate.id);
    if (index !== -1) {
      this.estates = [...this.estates.slice(0, index), estate, ...this.estates.slice(index + 1)];
      return of(this.estates[index]);
    }
    return of(estate);
  }

  deleteEstate(estateId: string): Observable<any> {
    const index = this.estates.findIndex(e => e.id === estateId);
    if (index !== -1) {
      this.estates = [...this.estates.slice(0, index), ...this.estates.slice(index + 1)];
      return of({ success: true });
    }
    return of({ success: false });
  }
}
