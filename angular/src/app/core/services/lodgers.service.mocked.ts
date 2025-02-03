import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Lodger_Dto } from '../models/dtos/lodger.dto.model';
import { Lodger_Post } from '../models/requests/lodger-post-request.model';
import { Lodger_Patch } from '../models/requests/lodger-patch-request.model';

@Injectable({
  providedIn: 'root'
})
export class MockLodgersService {

  private lodgers: Lodger_Dto[] = [
    { id: 'lodger1', user_id: 'user1', name: 'John Doe', created_at: '2024-12-30T18:23:19+01:00', updated_at: '2024-12-30T18:23:19+01:00' },
    { id: 'lodger2', user_id: 'user1', name: 'Jane Smith', created_at: '2024-12-30T18:23:19+01:00', updated_at: '2024-12-30T18:23:19+01:00' }
  ];

  create(lodger: Lodger_Post): Observable<Lodger_Dto> {
    const newLodger: Lodger_Dto = { id: `lodger${this.lodgers.length + 1}`, user_id: 'user1',  created_at: '2024-12-30T18:23:19+01:00', updated_at: '2024-12-30T18:23:19+01:00' , ...lodger };
    this.lodgers.push(newLodger);
    return of(newLodger);
  }

  read(): Observable<Lodger_Dto[]> {
    return of(this.lodgers);
  }

  update(lodger: Lodger_Patch): Observable<Lodger_Dto> {
    const index = this.lodgers.findIndex(l => l.id === lodger.id);
    if (index !== -1) {
      this.lodgers[index] = { ...this.lodgers[index], ...lodger };
    }
    return of(this.lodgers[index]);
  }

  delete(lodgerId: string): Observable<string> {
    this.lodgers = this.lodgers.filter(l => l.id !== lodgerId);
    return of(lodgerId);
  }
}
