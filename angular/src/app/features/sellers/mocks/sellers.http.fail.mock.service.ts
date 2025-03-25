import { delay, Observable, of, tap } from 'rxjs';

export class SellerHttpFailMockService {

  getAll(): Observable<any> {
    return of(null).pipe(
      delay(0),
      tap(()=> {
        throw new Error('Failed to load sellers');
      })
    )
  }

  create(): Observable<any> {
    return of(null).pipe(
      delay(0),
      tap(()=> {
        throw new Error('Failed to create seller');
      })
    )
  }

  update(): Observable<any> {
    return of(null).pipe(
      delay(0),
      tap(()=> {
        throw new Error('Failed to update seller');
      })
    )
  }

  delete(): Observable<any> {
    return of(null).pipe(
      delay(0),
      tap(()=> {
        throw new Error('Failed to delete seller');
      })
    )
  }
}
