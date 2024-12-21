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
import { createRentReceiptEmail, createRentReciptPdf, getRentReceiptInfos } from './rent-receipts/rent-receipts.business';
import { RentsDbService } from './rents.db.service';
import { ConfigService } from '@nestjs/config';
import { SpreadSheetGoogleStrategy } from './spreadsheets/spreadsheets.google.strategy';
import { buildSpreadsheetContext, SpreadSheet } from './spreadsheets/rents.spreadsheets.business';
import { SpreadSheetStrategy } from './spreadsheets/spreadsheets.strategy';
import { Docs_Db } from 'src/docs/docs.db.model';
import { Rent_Db } from './rents.db';
import { getStartAndEnDatesFromRents } from './rents.utils';


@Injectable()
export class RentsService {

  constructor(private config: ConfigService, private rentsDbService: RentsDbService, private docsDbService: DocsDbService, private estateService: EstatesService, private ownerService: OwnersService, private lodgerService: LodgersService
  ) { }

  buildRentReciptPdf(userId: string, estate: any, owner: any, lodger: any, startDate_: string, endDate_: string, accessToken: string, refreshToken: string, clientId: string, clientSecret: string): Observable<any> {

    const { startDate, endDate, rent, charges } = getRentReceiptInfos(estate, owner, lodger, startDate_, endDate_);

    return from(this.rentsDbService.create({ user_id: userId, estate_id: estate.id, lodger_id: lodger.id, start_date: startDate, end_date: endDate, rent, charges })).pipe(
      tap(_ => this.addPeriodToGoogleSheet(estate.user_id, estate.id, startDate, endDate, accessToken, refreshToken, clientId, clientSecret).pipe(take(1)).subscribe()),
      switchMap(_ => from(createRentReciptPdf(estate, owner, lodger, startDate_, endDate_))),
      catchError(_ => from(createRentReciptPdf(estate, owner, lodger, startDate_, endDate_)))
    );
  }

  BuildRentReceiptEmail(userId: string, owners: Owner_Db[], lodgers: Lodger_Db[], estate: Estate_Db, startDate_?: string, endDate_?: string) {

    const owner = owners.find(owner => owner.id === estate.owner_id);
    const lodger = lodgers.find(lodger => lodger.id === estate.lodger_id);

    const { startDate, endDate, rent, charges } = getRentReceiptInfos(estate, owner, lodger, startDate_, endDate_);

    return from(this.rentsDbService.create({ user_id: userId, estate_id: estate.id, lodger_id: lodger.id, start_date: startDate, end_date: endDate, rent, charges })).pipe(
      switchMap(rent => from(createRentReceiptEmail(userId, owners, lodgers, estate, startDate_, endDate_))),
      catchError(err => from(createRentReceiptEmail(userId, owners, lodgers, estate, startDate_, endDate_)))
    );
  }

  addPeriodToExcel(userId: string, estateId: string, startDate: Date, endDate: Date, spreadSheetStrategy?: SpreadSheetStrategy): Observable<Docs_Db> {
    try {
      return this.getFullEstates(userId).pipe(
        take(1),
        switchMap(estates => combineLatest([of(estates), this.getSpreadSheetId(userId)])),
        switchMap(([estates, spreadSheetId]) => from(buildSpreadsheetContext(spreadSheetStrategy, spreadSheetId, estates, startDate, endDate))),
        switchMap(({ spreadSheet, hasBeenRemoved }) => this.saveSpreadSheetId(userId, spreadSheet, hasBeenRemoved)),
        catchError(err => {
          console.error(err);
          return of(null);
        })
      );
    } catch (err) {
      console.log('fail to add period to excel')
      console.error(err);
      of(err);
    }
  }

  synchronizeRentsInGoogleSheet(userId: string, accessToken: string, refreshToken: string, clientId: string, clientSecret: string): Observable<Docs_Db> {
    const spreadSheetStrategy = new SpreadSheetGoogleStrategy();
    return from(spreadSheetStrategy.init(accessToken, refreshToken, clientId, clientSecret)).pipe(
      switchMap(_ => this.getFullEstates(userId)),
      switchMap((estates) => combineLatest([of(estates), this.rentsDbService.getByUserId(userId), this.getSpreadSheetId(userId)])),
      switchMap(([estates, rents, spreadSheetId]) => from(buildSpreadsheetContext(spreadSheetStrategy, spreadSheetId, estates, getStartAndEnDatesFromRents(rents).startDate, getStartAndEnDatesFromRents(rents).endDate))),
      switchMap(({ spreadSheet, hasBeenRemoved }) => this.saveSpreadSheetId(userId, spreadSheet, hasBeenRemoved)),
      catchError(err => {
        console.error(err);
        return of(null);
      })
    );
    return of(null);
  }

  getFusionnedRents(user_id): Observable<Rent_Db[]> {
    return of(null);
  }

  private addPeriodToGoogleSheet(userId: string, estateId: string, startDate: Date, endDate: Date, accessToken: string, refreshToken: string, clientId: string, clientSecret: string): Observable<Docs_Db> {
    if(this.config.get('NODE_ENV') === 'test') return;
    const spreadSheetStrategy = new SpreadSheetGoogleStrategy();
    return from(spreadSheetStrategy.init(accessToken, refreshToken, clientId, clientSecret)).pipe(
      switchMap(_ => this.addPeriodToExcel(userId, estateId, startDate, endDate, spreadSheetStrategy)),
    );
  }

  private getSpreadSheetId(userId: string) {
    return this.docsDbService.getByUser(userId).pipe(
      map(docs => {
        return docs[0]?.rents_google_sheet_id;
      })
    );
  }

  private saveSpreadSheetId(userId: string, spreadSheet: SpreadSheet, hasBeenRemoved: boolean): Observable<Docs_Db> {
    if (hasBeenRemoved) {
      return this.docsDbService.deleteByUserId(userId).pipe(
        switchMap(_ => this.docsDbService.create({ user_id: userId, rents_google_sheet_id: spreadSheet.id })));
    } else {
      return this.docsDbService.getByUser(userId).pipe(
        switchMap(docs => {
          if(docs && docs.length > 0){
            return of(docs[0]);
          }else{
            return this.docsDbService.create({ user_id: userId, rents_google_sheet_id: spreadSheet.id });
          }
        })
      );
    }
  }

  private getFullEstates(userId: string): Observable<Estate_filled_Db[]> {
    return combineLatest([this.estateService.getByUser(userId), this.ownerService.getByUser(userId), this.lodgerService.getByUser(userId)]).pipe(
      map(([estates, owners, lodgers]) => estates.map(estate => {
        const owner = owners.find(owner => owner.id === estate.owner_id);
        const lodger = lodgers.find(lodger => lodger.id === estate.lodger_id);
        return { ...estate, owner, lodger };
      })
      )
    );
  }
}