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
import { createNewSheet, fillSheet, getOath2Client, getSpreadSheetRanges, setRentInSheet } from './rents.sheets.buisness';
import { ConfigService } from '@nestjs/config';
import { SpreadSheetGoogleStrategy } from './spreadsheets.google.strategy';
import { buildSpreadsheetContext, SpreadSheet } from './rents.spreadsheet.buisness';
import { SpreadSheetStrategy } from './spreadsheets.strategy';
import { Docs_Db } from 'src/docs/docs.db.model';


@Injectable()
export class RentsService {

  constructor(private config: ConfigService, private rentsDbService: RentsDbService, private docsDbService: DocsDbService, private estateService: EstatesService, private ownerService: OwnersService, private lodgerService: LodgersService
  ) { }

  buildRentReciptPdf(estate: any, owner: any, lodger: any, startDate_: string, endDate_: string, accessToken: string, refreshToken: string, clientId: string, clientSecret: string): Observable<any> {

    const { startDate, endDate, rent, charges } = getRentReceiptInfos(estate, owner, lodger, startDate_, endDate_);

    return from(this.rentsDbService.create({ estate_id: estate.id, lodger_id: lodger.id, start_date: startDate, end_date: endDate, rent, charges })).pipe(
      tap(_ => this.addPeriodToGoogleSheet(estate.user_id, estate.id, startDate, endDate, accessToken, refreshToken, clientId, clientSecret).pipe(take(1)).subscribe()),
      switchMap(_ => from(createRentReciptPdf(estate, owner, lodger, startDate_, endDate_))),
      catchError(_ => from(createRentReciptPdf(estate, owner, lodger, startDate_, endDate_)))
    );
  }

  addPeriodToGoogleSheet(userId: string, estateId: string, startDate: Date, endDate: Date, accessToken: string, refreshToken: string, clientId: string, clientSecret: string): Observable<Docs_Db> {

    if(this.config.get('NODE_ENV') === 'test') return;
    const spreadSheetStrategy = new SpreadSheetGoogleStrategy();
    return from(spreadSheetStrategy.init(accessToken, refreshToken, clientId, clientSecret)).pipe(
      switchMap(_ => this.addPeriodToExcel(userId, estateId, startDate, endDate, spreadSheetStrategy)),
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

  addPeriodToExcel(userId: string, estateId: string, startDate: Date, endDate: Date, spreadSheetStrategy?: SpreadSheetStrategy): Observable<Docs_Db> {

    try {
      return this.getFullEstates(userId).pipe(
        take(1),
        switchMap(estates => combineLatest([of(estates), this.getSpreadSheetId(userId)])),
        switchMap(([estates, spreadSheetId]) => from(buildSpreadsheetContext(spreadSheetStrategy, spreadSheetId, estates, startDate, endDate))),
        tap(_ => console.log('spreadSheet built', _)),
        switchMap(({ spreadSheet, hasBeenRemoved }) => this.saveSpreadSheetId(userId, spreadSheet, hasBeenRemoved)),
        tap(_ => console.log('spreadSheet saved')),
        catchError(err => {
          console.error(err);
          return of(null);
        })
      );

    } catch (err) {
      console.error(err);
      of(err);
    }

    // buildSpreadsheetContext(spreadSheetGoogleStrategy, userId, startDate, endDate).then(spreadSheet => {

    // const startYear = startDate.getFullYear();
    // const endYear = endDate.getFullYear();
    // const years = [];

    // for (let year = startYear; year <= endYear; year++) {
    //   years.push(year);
    // }

    // if (this.config.get('NODE_ENV') === 'test') return;
    // from(getOath2Client(accessToken, refreshToken, clientId, clientSecret)).pipe(


    //   //get actual context rows in google sheet (so create one if not exists with all the years and estates or complete needed and not exists years sheet) => return a row of actual google sheet
    //   //buildSpreadsheetContext

    //   //build a row of modification that the addPeriodToExcel gonna do in the google sheet as an array
    //   //composeSpreadsheetModification

    //   //update the spreadsheet with the row of modification



    //   //if not exist create a new sheet and fill it. If exist get the sheetId
    //   switchMap((oauth2client) => (combineLatest([of(oauth2client), this.createOrGetSheetId(oauth2client, userId, years)]))),
    //   //prepare all the data to update the sheet
    //   switchMap(([oauth2client, { sheetId, estates, owners, lodgers }]) => combineLatest([of(oauth2client), of(sheetId), this.getFullEstate(userId, estateId, estates, owners, lodgers)])),
    //   //update the sheet
    //   switchMap(([oauth2client, sheetId, estate]) => setRentInSheet(oauth2client, sheetId, estate, startDate, endDate)),

    // ).pipe(
    //   take(1)
    // ).subscribe();

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

  private getFullEstate(ueserId: string, estateId: string, estates?: Estate_Db[], owners?: Owner_Db[], lodgers?: Lodger_Db[]): Observable<Estate_filled_Db> {
    return combineLatest([
      estates?.find(estate => estate.id === estateId) ? of(estates?.find(estate => estate.id === estateId)) : this.estateService.getById(estateId),
      owners ? of(owners) : this.ownerService.getByUser(ueserId),
      lodgers ? of(lodgers) : this.lodgerService.getByUser(ueserId)
    ]).pipe(
      map(([estate, owners, lodgers]) => {
        const owner = owners.find(owner => owner.id === estate.owner_id);
        const lodger = lodgers.find(lodger => lodger.id === estate.lodger_id);
        return { ...estate, owner, lodger };
      })
    );
  }

  private createOrGetSheetId(oauth2client, userId, years: string[]): Observable<{ sheetId: string, estates?: Estate_Db[], owners?: Owner_Db[], lodgers?: Lodger_Db[] }> {
    return this.docsDbService.getByUser(userId).pipe(
      take(1),
      switchMap(docs => {

        if (docs?.length > 0) {
          return this.getConformedGoogleSheet(oauth2client, docs[0].rents_google_sheet_id, userId, years);

          return of({ sheetId: docs[0].rents_google_sheet_id });
        } else {
          return this.createAndFillNewSheet(oauth2client, userId, years);
        }
      }));
  }

  private getConformedGoogleSheet(oauth2client, docId: string, userId, years): Observable<any> {
    return this.checkIfGoogleSheetExist(oauth2client, docId).pipe(
      switchMap(exist => exist ? this.checkAndConformActualGoogleSheet(oauth2client, docId, userId, years) : this.createAndFillNewSheet(oauth2client, userId, years))
    )
  }

  private checkIfGoogleSheetExist(oauth2client, docId: string): Observable<any> {
    return of(null);
  }

  private checkAndConformActualGoogleSheet(oauth2client, docId: string, userId: string, years: number[]): Observable<any> {

    return from(getSpreadSheetRanges(oauth2client, docId)).pipe(

    )

    return of(docId);
  }

  private createAndFillNewSheet(oauth2client: any, userId: string, years: string[]): Observable<any> {
    return this.createNewSheet(oauth2client, userId).pipe(
      switchMap(sheetId => combineLatest([of(sheetId), this.estateService.getByUser(userId), this.ownerService.getByUser(userId), this.lodgerService.getByUser(userId)])),
      switchMap(([sheetId, estates, owners, lodgers]) => from(fillSheet(estates, owners, lodgers, years, oauth2client, sheetId)).pipe(result => of({ sheetId, estates, owners, lodgers })))
    )
  }

  private createNewSheet(oauth2Client: any, userId: string): Observable<any> {
    return from(createNewSheet(oauth2Client)).pipe(
      tap(sheetId => this.docsDbService.create({ user_id: userId, rents_google_sheet_id: sheetId })),
    )
  }


}