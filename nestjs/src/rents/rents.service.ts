import { Injectable } from '@nestjs/common';
import { catchError, from, Observable, switchMap } from 'rxjs';
import { createRentReciptPdf, getRentReceiptInfos } from './rent-receipts.business';
import { RentsDbService } from './rents.db.service';


@Injectable()
export class RentsService {

  constructor( private rentsDbService: RentsDbService,
  ) { }

  
  buildRentReciptPdf(estate: any, owner: any, lodger: any, startDate_: string, endDate_: string): Observable<any> {

    const { startDate, endDate, rent, charges, totalRent, street, ownerZipAndCity, lodgerZipAndCity, madeAt, signature } = getRentReceiptInfos(estate, owner, lodger, startDate_, endDate_);

    return from(this.rentsDbService.create({ estate_id: estate.id, lodger_id: lodger.id, start_date: startDate, end_date: endDate, rent, charges })).pipe(
      switchMap( rent => from(createRentReciptPdf(estate, owner, lodger, startDate_, endDate_))),
      catchError( err => from(createRentReciptPdf(estate, owner, lodger, startDate_, endDate_)))
    );
  }

}