import { Injectable } from '@nestjs/common';
import { catchError, from, Observable, switchMap } from 'rxjs';
import { createRentReceiptEmail, createRentReciptPdf, getRentReceiptInfos } from './rent-receipts.business';
import { RentsDbService } from './rents.db.service';
import { Owner_Db } from 'src/owners/owners-db.model';
import { Lodger_Db } from 'src/lodgers/lodger-db.model';
import { Estate_Db } from 'src/estates/estate-db.model';


@Injectable()
export class RentsService {

  constructor(private rentsDbService: RentsDbService,
  ) { }


  buildRentReciptPdf(estate: any, owner: any, lodger: any, startDate_: string, endDate_: string): Observable<any> {

    const { startDate, endDate, rent, charges } = getRentReceiptInfos(estate, owner, lodger, startDate_, endDate_);

    return from(this.rentsDbService.create({ estate_id: estate.id, lodger_id: lodger.id, start_date: startDate, end_date: endDate, rent, charges })).pipe(
      switchMap(rent => from(createRentReciptPdf(estate, owner, lodger, startDate_, endDate_))),
      catchError(err => from(createRentReciptPdf(estate, owner, lodger, startDate_, endDate_)))
    );
  }

  BuildRentReceiptEmail(owners: Owner_Db[], lodgers: Lodger_Db[], estate: Estate_Db, startDate_?: string, endDate_?: string) {

    const owner = owners.find(owner => owner.id === estate.owner_id);
    const lodger = lodgers.find(lodger => lodger.id === estate.lodger_id);

    const { startDate, endDate, rent, charges } = getRentReceiptInfos(estate, owner, lodger, startDate_, endDate_);

    return from(this.rentsDbService.create({ estate_id: estate.id, lodger_id: lodger.id, start_date: startDate, end_date: endDate, rent, charges })).pipe(
      switchMap(rent => from(createRentReceiptEmail(owners, lodgers, estate, startDate_, endDate_))),
      catchError(err => from(createRentReceiptEmail(owners, lodgers, estate, startDate_, endDate_)))
    );
  }

}