import { delay, Observable, of, tap, throwError } from 'rxjs';

export class ProspectionHttpFailMockService {

  getAll(): Observable<any> {
    return of(null).pipe(
      delay(0),
      tap(()=> {
        throw new Error('Failed to load prospections');
      })
    )
  }

  create(): Observable<any> {
    return of(null).pipe(
      delay(0),
      tap(()=> {
        throw new Error('Failed to create prospection');
      })
    )
  }

  update(): Observable<any> {
    return of(null).pipe(
      delay(0),
      tap(()=> {
        throw new Error('Failed to update prospection');
      })
    )
  }

  delete(): Observable<any> {
    return of(null).pipe(
      delay(0),
      tap(()=> {
        throw new Error('Failed to delete prospection');
      })
    )
  }
}
