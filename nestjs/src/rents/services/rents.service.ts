import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, combineLatest, from, map, Observable, of, switchMap, take, tap } from 'rxjs';
import { Docs_Db } from '../../docs/docs.db.model';
import { sendEmail } from '../../emails/emails.buisness';
import { DocsDbService } from '../../docs/docs.db.service';
import { Estate_filled_Db } from '../../estates/estate-filled-db.model';
import { EstatesService } from '../../estates/estates.service';
import { LodgersService } from '../../lodgers/lodgers.service';
import { OwnersService } from '../../owners/owners.service';
import { MonthlyRents } from '../models/monlthy-rent.model';
import { createRentReceiptEmail, createRentReciptPdf, getRentReceiptInfos } from '../rent-receipts/rent-receipts.business';
import { RentsDbService } from './rents.db.service';
import { fusionateRents, getRentsByMonth, getStartAndEnDatesFromRents } from '../rents.utils';
import { SpreadSheet } from '../../spreadsheets/models/spreadsheets.model';
import { buildSpreadsheetContext, buildSpreadsheetContext2, fillSpreadSheetCells } from '../spreadsheets/rents.spreadsheets.business';
import { SpreadSheetGoogleStrategy } from '../../spreadsheets/strategies/spreadsheets.google.strategy';
import { GoogleConnect } from '../../google/models/google.connect.model';
import { EstatesGoogleSheet } from './model/estates.google.sheet.model';


@Injectable()
export class RentsService {

  constructor(private config: ConfigService, private rentsDbService: RentsDbService, private docsDbService: DocsDbService, private estateService: EstatesService, private ownerService: OwnersService, private lodgerService: LodgersService
  ) { }

  buildRentReceiptPdf(userId: string, estate: any, owner: any, lodger: any, startDate_: string, endDate_: string, accessToken: string, refreshToken: string, clientId: string, clientSecret: string): Observable<any> {

    const { startDate, endDate, rent, charges } = getRentReceiptInfos(estate, owner, lodger, startDate_, endDate_);

    return from(this.rentsDbService.create({ user_id: userId, estate_id: estate.id, lodger_id: lodger.id, start_date: startDate, end_date: endDate, rent, charges })).pipe(
      switchMap(_ => from(createRentReciptPdf(estate, owner, lodger, startDate_, endDate_))),
      catchError(_ => from(createRentReciptPdf(estate, owner, lodger, startDate_, endDate_)))
    );
  }

  SendRentReceiptByEmail(userId: string, estateId: string, accessToken: string, refreshToken: string, clientId: string, clientSecret: string, startDate_?: string, endDate_?: string): Observable<string> {

    return from(this.getFullEstates(userId)).pipe(
      switchMap(estates => {

        const estate = estates.find(estate => estate.id === estateId);
        const { startDate, endDate } = getRentReceiptInfos(estate, estate.owner, estate.lodger, startDate_, endDate_);

        return from(this.rentsDbService.create({ user_id: userId, estate_id: estate.id, lodger_id: estate.lodger_id, start_date: startDate, end_date: endDate, rent: estate.rent, charges: estate.charges, sent: true })).pipe(
          // tap(_ => this.synchronizeRentsInGoogleSheet(userId, accessToken, refreshToken, clientId, clientSecret).pipe(take(1)).subscribe()),
          switchMap(_ => from(createRentReceiptEmail(estate, startDate, endDate))),
          switchMap(base64EncodedEmail => sendEmail(accessToken, refreshToken, base64EncodedEmail, clientId, clientSecret)),
          catchError(_ => of(null))
        );

      })
    );

  }

  synchronizeRentsInGoogleSheet2(estatesGoogleSheet: EstatesGoogleSheet) {
    const strategy = new SpreadSheetGoogleStrategy();
    return from(strategy.init(estatesGoogleSheet.google)).pipe(
      switchMap( () => from(buildSpreadsheetContext2(strategy, estatesGoogleSheet))),
      switchMap( spreadSheet => from(fillSpreadSheetCells(strategy, spreadSheet, estatesGoogleSheet.rents, estatesGoogleSheet.estates)))
    );
  }

  synchronizeRentsInGoogleSheet(userId: string, google: GoogleConnect): Observable<Docs_Db> {
    if (!google.accessToken || !google.refreshToken || !google.clientId || !google.clientSecret) return of(null);
    const spreadSheetStrategy = new SpreadSheetGoogleStrategy();
    return from(spreadSheetStrategy.init(google)).pipe(
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

  synchronizeRentsInGoogleSheetDraft(userId: string, accessToken: string, refreshToken: string, clientId: string, clientSecret: string): any {//} Observable<Docs_Db> {
    // if (!accessToken || !refreshToken || !clientId || !clientSecret) return of(null);
    // const spreadSheetStrategy = new SpreadSheetGoogleStrategy();
    // return from(spreadSheetStrategy.init(accessToken, refreshToken, clientId, clientSecret)).pipe(
    //   switchMap(_ => this.getFullEstates(userId)),
    //   switchMap((estates) => combineLatest([of(estates), this.rentsDbService.getByUserId(userId), this.getSpreadSheetId(userId)])),
    //   switchMap(([estates, rents, spreadSheetId]) => combineLatest([of(estates), of(rents), from(buildSpreadsheetContext(spreadSheetStrategy, spreadSheetId, estates, getStartAndEnDatesFromRents(rents).startDate, getStartAndEnDatesFromRents(rents).endDate))])),
    //   switchMap(([estates, rents, { spreadSheet, hasBeenRemoved }]) => combineLatest([of(hasBeenRemoved), from(fillSpreadSheetCells(spreadSheetStrategy, spreadSheet, rents, estates))])),
    //   switchMap(([hasBeenRemoved, spreadSheet]) => this.saveSpreadSheetId(userId, spreadSheet, hasBeenRemoved)),
    //   catchError(err => {
    //     console.error(err);
    //     return of(null);
    //   })
    // )
  }

  getMonthlyRents(userId: string): Observable<MonthlyRents[]> {
    return combineLatest([this.rentsDbService.getByUserId(userId), this.getFullEstates(userId)]).pipe(
      map(([rents, estates]) => ([rents, fusionateRents(rents, estates)])),
      map(([rentsFromDb, fusionnedRents]) => getRentsByMonth(fusionnedRents, rentsFromDb)),
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