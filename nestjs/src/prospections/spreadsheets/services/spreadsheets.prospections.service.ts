import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { lastValueFrom } from "rxjs";
import { Docs_Db } from "src/docs/docs.db.model";
import { setTimeout } from "timers/promises";
import { DocsDbService } from "../../../docs/docs.db.service";
import { SpreadSheetGoogleStrategy } from "../../../spreadsheets/strategies/spreadsheets.google.strategy";
import { MockedGoogleSpreadSheetStrategy } from "../../../spreadsheets/strategies/spreadsheets.mocked.strategy";
import { SHEET_SYNCHRONIZATION_INTERVAL_MS, getLastSpreadSheetSynchronization, getNextSpreadSheetSynchronization } from "../../prospections.utils";
import { synchronizeProspections } from "../../spreadsheets/spreadsheets.prospection.business";
import { ProspectionsDbService } from "../../services/prospections.db.service";
import { SellersDbService } from "../../services/sellers.db.service";

@Injectable()
export class SpreadSheetsProspectionsService {

    constructor(private ProspectionsDbService: ProspectionsDbService, private sellersServicer: SellersDbService, private docsServices: DocsDbService, private configService: ConfigService) { }

    private async runSynchronizationWithDelay(userDoc: Docs_Db) {
        if (userDoc?.lastSynchronization) {
            const lastSynchronization = new Date(userDoc.lastSynchronization);
            if (getLastSpreadSheetSynchronization(lastSynchronization.getTime()) > SHEET_SYNCHRONIZATION_INTERVAL_MS) {
                const nextMinute = getNextSpreadSheetSynchronization();
                this.docsServices.update({ id: userDoc.id, lastSynchronization: nextMinute });
                await setTimeout(nextMinute.getTime() - Date.now());
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }

    async synchronizeGoogleSheet(user_id: string, accessToken, refreshToken, clientId, clientSecret) {
        try {

            const userDoc = (await lastValueFrom(this.docsServices.getByUser(user_id)))?.[0];

            if (await this.runSynchronizationWithDelay(userDoc)) {

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
                            prospections_google_sheet_id: spreadSheet.id
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
            } else {
                console.log('a synchronization is already scheduled');
            }

        } catch (e) {
            console.log(e);
        }
    }

}