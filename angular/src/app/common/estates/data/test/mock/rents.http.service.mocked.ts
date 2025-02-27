import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MockRentsHttpService {

  constructor() { }

  loadMonthlyRents(): Observable<any> {
    return of([]);
  }
}
