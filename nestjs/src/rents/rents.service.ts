import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, combineLatest, from, map, Observable, of, switchMap, take, tap } from 'rxjs';
import { Docs_Db } from 'src/docs/docs.db.model';
import { DocsDbService } from '../docs/docs.db.service';
import { Estate_Db } from '../estates/estate-db.model';
import { Estate_filled_Db } from '../estates/estate-filled-db.model';
import { EstatesService } from '../estates/estates.service';
import { Lodger_Db } from '../lodgers/lodger-db.model';
import { LodgersService } from '../lodgers/lodgers.service';
import { Owner_Db } from '../owners/owners-db.model';
import { OwnersService } from '../owners/owners.service';
import { MonthlyRents } from './monlthy-rent.model';
import { createRentReceiptEmail, createRentReciptPdf, getRentReceiptInfos } from './rent-receipts/rent-receipts.business';
import { RentsDbService } from './rents.db.service';
import { fusionateRents, getRentsByMonth, getStartAndEnDatesFromRents } from './rents.utils';
import { SpreadSheet } from './spreadsheets/models/spreadsheets.model';
import { buildSpreadsheetContext, fillSpreadSheetCells } from './spreadsheets/rents.spreadsheets.business';
import { SpreadSheetGoogleStrategy } from './spreadsheets/strategies/spreadsheets.google.strategy';
import { sendEmail } from 'src/emails/emails.buisness';


@Injectable()
export class RentsService {

  constructor(private config: ConfigService, private rentsDbService: RentsDbService, private docsDbService: DocsDbService, private estateService: EstatesService, private ownerService: OwnersService, private lodgerService: LodgersService
  ) { }

  buildRentReciptPdf(userId: string, estate: any, owner: any, lodger: any, startDate_: string, endDate_: string, accessToken: string, refreshToken: string, clientId: string, clientSecret: string): Observable<any> {

    const { startDate, endDate, rent, charges } = getRentReceiptInfos(estate, owner, lodger, startDate_, endDate_);

    return from(this.rentsDbService.create({ user_id: userId, estate_id: estate.id, lodger_id: lodger.id, start_date: startDate, end_date: endDate, rent, charges })).pipe(
      tap(_ => this.synchronizeRentsInGoogleSheet(userId, accessToken, refreshToken, clientId, clientSecret).pipe(take(1)).subscribe()),
      switchMap(_ => from(createRentReciptPdf(estate, owner, lodger, startDate_, endDate_))),
      catchError(_ => from(createRentReciptPdf(estate, owner, lodger, startDate_, endDate_)))
    );
  }

  BuildRentReceiptEmail(userId: string, estateId: string, accessToken: string, refreshToken: string, clientId: string, clientSecret: string, startDate_?: string, endDate_?: string): Observable<string> {

    return from(this.getFullEstates(userId)).pipe(
      switchMap(estates => {

        const estate = estates.find(estate => estate.id === estateId);
        const { startDate, endDate } = getRentReceiptInfos(estate, estate.owner, estate.lodger, startDate_, endDate_);

        return from(this.rentsDbService.create({ user_id: userId, estate_id: estate.id, lodger_id: estate.lodger_id, start_date: startDate, end_date: endDate, rent: estate.rent, charges: estate.charges, sent: true })).pipe(
          tap(_ => this.synchronizeRentsInGoogleSheet(userId, accessToken, refreshToken, clientId, clientSecret).pipe(take(1)).subscribe()),
          switchMap(_ => from(createRentReceiptEmail(estate, startDate, endDate))),
          switchMap(base64EncodedEmail => sendEmail(accessToken, refreshToken, base64EncodedEmail, clientId, clientSecret)),
          catchError(_ => of(null))
        );

      })
    );

  }

  synchronizeRentsInGoogleSheet(userId: string, accessToken: string, refreshToken: string, clientId: string, clientSecret: string): Observable<Docs_Db> {
    if (!accessToken || !refreshToken || !clientId || !clientSecret) return of(null);
    const spreadSheetStrategy = new SpreadSheetGoogleStrategy();
    return from(spreadSheetStrategy.init(accessToken, refreshToken, clientId, clientSecret)).pipe(
      switchMap(_ => this.getFullEstates(userId)),
      switchMap((estates) => combineLatest([of(estates), this.rentsDbService.getByUserId(userId), this.getSpreadSheetId(userId)])),
      switchMap(([estates, rents, spreadSheetId]) => combineLatest([of(estates), of(rents), from(buildSpreadsheetContext(spreadSheetStrategy, spreadSheetId, estates, getStartAndEnDatesFromRents(rents).startDate, getStartAndEnDatesFromRents(rents).endDate))])),
      switchMap(([estates, rents, { spreadSheet, hasBeenRemoved }]) => combineLatest([of(hasBeenRemoved), from(fillSpreadSheetCells(spreadSheetStrategy, spreadSheet, rents, estates))])),
      switchMap(([hasBeenRemoved, spreadSheet]) => this.saveSpreadSheetId(userId, spreadSheet, hasBeenRemoved)),
      catchError(err => {
        console.error(err);
        return of(null);
      })
    )
  }

  getMonthlyRents(userId: string): Observable<MonthlyRents[]> {
    return combineLatest([this.rentsDbService.getByUserId(userId), this.getFullEstates(userId)]).pipe(
      map(([rents, estates]) => fusionateRents(rents, estates)),
      map(rents => getRentsByMonth(rents))
    )
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
          if (docs && docs.length > 0) {
            return of(docs[0]);
          } else {
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