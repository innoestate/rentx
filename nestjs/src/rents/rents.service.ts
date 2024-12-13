import { Injectable } from '@nestjs/common';
import { catchError, combineLatest, from, map, Observable, of, switchMap, take, tap } from 'rxjs';
import { Estate_filled_Db } from '../estates/estate-filled-db.model';
import { DocsDbService } from '../docs/docs.db.service';
import { Estate_Db } from '../estates/estate-db.model';
import { EstatesService } from '../estates/estates.service';
import { Lodger_Db } from '../lodgers/lodger-db.model';
import { LodgersService } from '../lodgers/lodgers.service';
import { Owner_Db } from '../owners/owners-db.model';
import { OwnersService } from '../owners/owners.service';
import { createRentReceiptEmail, createRentReciptPdf, getRentReceiptInfos } from './rent-receipts.business';
import { RentsDbService } from './rents.db.service';
import { createNewSheet, fillSheet, getOath2Client, setRentInSheet } from './rents.sheets.buisness';


@Injectable()
export class RentsService {

  constructor(private rentsDbService: RentsDbService, private docsDbService: DocsDbService, private estateService: EstatesService, private ownerService: OwnersService, private lodgerService: LodgersService
  ) { }

  buildRentReciptPdf(estate: any, owner: any, lodger: any, startDate_: string, endDate_: string, accessToken: string, refreshToken: string, clientId: string, clientSecret: string): Observable<any> {

    const { startDate, endDate, rent, charges } = getRentReceiptInfos(estate, owner, lodger, startDate_, endDate_);

    return from(this.rentsDbService.create({ estate_id: estate.id, lodger_id: lodger.id, start_date: startDate, end_date: endDate, rent, charges })).pipe(
      tap(_ => this.addPeriodToExcel(estate.user_id, estate.id, startDate_, endDate_, accessToken, refreshToken, clientId, clientSecret)),
      switchMap(_ => from(createRentReciptPdf(estate, owner, lodger, startDate_, endDate_))),
      catchError(_ => from(createRentReciptPdf(estate, owner, lodger, startDate_, endDate_)))
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

  addPeriodToExcel(userId: string, estateId: string, startDate: string, endDate: string, accessToken: string, refreshToken: string, clientId: string, clientSecret: string): void {
    
    from(getOath2Client(accessToken, refreshToken, clientId, clientSecret)).pipe(

      //if not exist create a new sheet and fill it. If exist get the sheetId
      switchMap((oauth2client) => (combineLatest([of(oauth2client), this.createOrGetSheetId(oauth2client, userId)]))),
      //prepare all the data to update the sheet
      switchMap(([oauth2client, { sheetId, estates, owners, lodgers }]) => combineLatest([of(oauth2client), of(sheetId), this.getFullEstate(estateId, estates, owners, lodgers)])),
      //update the sheet
      switchMap(([oauth2client, sheetId, estate]) => setRentInSheet(oauth2client, sheetId, estate, startDate, endDate)),

    ).pipe(
      take(1)
    ).subscribe();

  }

  private getFullEstate(estateId: string, estates?: Estate_Db[], owners?: Owner_Db[], lodgers?: Lodger_Db[]): Observable<Estate_filled_Db> {
    return combineLatest([
      estates?.find(estate => estate.id === estateId) ? of(estates?.find(estate => estate.id === estateId)) : this.estateService.getById(estateId),
      owners ? of(owners) : this.ownerService.getByUser(estateId),
      lodgers ? of(lodgers) : this.lodgerService.getByUser(estateId)
    ]).pipe(
      map(([estate, owners, lodgers]) => {
        const owner = owners.find(owner => owner.id === estate.owner_id);
        const lodger = lodgers.find(lodger => lodger.id === estate.lodger_id);
        return { ...estate, ...owner, ...lodger };
      })
    );
  }

  private createOrGetSheetId(oauth2client, userId): Observable<{ sheetId: string, estates?: Estate_Db[], owners?: Owner_Db[], lodgers?: Lodger_Db[] }> {
    return this.docsDbService.getByUser(userId).pipe(
      take(1),
      switchMap(docs => {

        if (docs?.length > 0) {
          return of({ sheetId: docs[0].rents_google_sheet_id });
        } else {
          return this.createNewSheet(oauth2client, userId).pipe(
            switchMap(sheetId => combineLatest([of(sheetId), this.estateService.getByUser(userId), this.ownerService.getByUser(userId), this.lodgerService.getByUser(userId)])),
            switchMap(([sheetId, estates, owners, lodgers]) => from(fillSheet(estates, owners, lodgers, oauth2client, sheetId)).pipe(result => of({ sheetId, estates, owners, lodgers })))
          )
        }
      }));
  }

  private createNewSheet(oauth2Client: any, userId: string): Observable<any> {
    return from(createNewSheet(oauth2Client)).pipe(
      tap(sheetId => this.docsDbService.create({ user_id: userId, rents_google_sheet_id: sheetId })),
    )
  }


}