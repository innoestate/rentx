import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { lastValueFrom } from "rxjs";
import { Docs_Db } from "src/docs/docs.db.model";
import { DocsDbService } from "../../../docs/docs.db.service";
import { SpreadSheetGoogleStrategy } from "../../../spreadsheets/strategies/spreadsheets.google.strategy";
import { MockedGoogleSpreadSheetStrategy } from "../../../spreadsheets/strategies/spreadsheets.mocked.strategy";
import { getLastSpreadSheetSynchronization, getNextSpreadSheetSynchronization } from "../../prospections.utils";
import { ProspectionsDbService } from "../../services/prospections.db.service";
import { SellersDbService } from "../../services/sellers.db.service";
import { synchronizeProspections } from "../business/spreadsheets.prospection.business";

@Injectable()
export class SpreadSheetsProspectionsService {

    constructor(private ProspectionsDbService: ProspectionsDbService, private sellersServicer: SellersDbService, private docsServices: DocsDbService, private configService: ConfigService) { }

    private async runOrNotSynchronizationWithDelay(userDoc: Docs_Db, callbackDoJob: (doTheJob: boolean) => Promise<void>, callBackDoNothing: (doNothing: boolean) => void) {
        if(this.configService.get('NODE_ENV') === 'test') {
            callbackDoJob(true);
            return true;
        }
        
        if (userDoc?.lastSynchronization) {
            const lastSynchronization = new Date(userDoc.lastSynchronization);
            if (getLastSpreadSheetSynchronization(lastSynchronization.getTime()) > 0) {
                const nextMinute = getNextSpreadSheetSynchronization();
                this.docsServices.update({ id: userDoc.id, lastSynchronization: nextMinute });
                setTimeout(() => {
                    callbackDoJob(true);
                }, nextMinute.getTime() - Date.now());
                return true;
            } else {
                callBackDoNothing(true);
                return false;
            }
        } else {
            callbackDoJob(true);
            return true;
        }
    }

    async synchronizeGoogleSheet(user_id: string, accessToken, refreshToken, clientId, clientSecret) {
        try {

            const userDoc = (await lastValueFrom(this.docsServices.getByUser(user_id)))?.[0];

            this.runOrNotSynchronizationWithDelay(userDoc, async doTheJob => {

                
                const prospections = await this.ProspectionsDbService.findAll(user_id);
                const sellers = await this.sellersServicer.findAllSellers(user_id);
                const googleSheetId = userDoc?.prospections_google_sheet_id
                let googleStrategy;
                if (this.configService.get('NODE_ENV') === 'test') {
                    googleStrategy = new MockedGoogleSpreadSheetStrategy();
                } else {
                    googleStrategy = new SpreadSheetGoogleStrategy();
                    await googleStrategy.init(accessToken, refreshToken, clientId, clientSecret);
                }
                const spreadSheet = await synchronizeProspections(googleStrategy, prospections, sellers, googleSheetId);
                if (!googleSheetId) { 
                    if (!userDoc) {
                        await lastValueFrom(this.docsServices.create({
                            user_id,
                            prospections_google_sheet_id: spreadSheet.id,
                            lastSynchronization: new Date()
                        }));
                    } else {
                        await lastValueFrom(this.docsServices.update({
                            id: userDoc.id,
                            prospections_google_sheet_id: spreadSheet.id,
                            lastSynchronization: new Date()
                        }))
                    }
                } else if (googleSheetId !== spreadSheet.id) {
                    await lastValueFrom(this.docsServices.update({
                        id: userDoc.id,
                        prospections_google_sheet_id: spreadSheet.id,
                        lastSynchronization: new Date()
                    }))
                }


            }, doNothing => {
                console.log('a synchronization is already scheduled');
            });

        } catch (e) {
            console.log(e);
        }
    }
    

}