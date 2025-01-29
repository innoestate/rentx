import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { from, lastValueFrom, tap } from "rxjs";
import { Docs_Db } from "src/docs/docs.db.model";
import { setTimeout } from "timers/promises";
import { DocsDbService } from "../../docs/docs.db.service";
import { SpreadSheetGoogleStrategy } from "../../spreadsheets/strategies/spreadsheets.google.strategy";
import { MockedGoogleSpreadSheetStrategy } from "../../spreadsheets/strategies/spreadsheets.mocked.strategy";
import { StorageService } from "../../storage/services/storage.service";
import { ProspectionDto } from "../dto/prospection.dto";
import { synchronizeProspections } from "../spreadsheets/spreadsheets.prospection.business";
import { ProspectionsDbService } from "./prospections.db.service";
import { SellersDbService } from "./sellers.db.service";
import { SHEET_SYNCHRONIZATION_INTERVAL_MS, getLastSpreadSheetSynchronization, getNextSpreadSheetSynchronization } from "../prospections.utils";

@Injectable()
export class ProspectionsService {

    constructor(private ProspectionsDbService: ProspectionsDbService, private storageService: StorageService, private sellersServicer: SellersDbService, private docsServices: DocsDbService, private configService: ConfigService) { }

    async createNewProspection(prospection: ProspectionDto, accessToken, refreshToken, clientId, clientSecret) {
        const result = await this.ProspectionsDbService.create(prospection);
        try {
            await this.storageService.synchronize(prospection.user_id, accessToken, refreshToken, clientId, clientSecret);
        } catch (e) {
            console.error(e);
        }
        try {
            await this.synchronizeGoogleSheet(prospection.user_id, accessToken, refreshToken, clientId, clientSecret);
        } catch (e) {
            console.error(e);
        }
        return result;
    }

    findAll(user_id: string) {
        return this.ProspectionsDbService.findAll(user_id);
    }

    findOne(id: string) {
        return this.ProspectionsDbService.findOne(id);
    }

    async update(id: string, updateProspectionDto: Partial<ProspectionDto>, accessToken, refreshToken, clientId, clientSecret) {

        const prospection = await this.ProspectionsDbService.findOne(id);

        return from(this.ProspectionsDbService.update(id, updateProspectionDto)).pipe(tap(update => {

            if (updateProspectionDto.address) {
                this.storageService.synchronize(prospection.user_id, accessToken, refreshToken, clientId, clientSecret);
                this.synchronizeGoogleSheet(prospection.user_id, accessToken, refreshToken, clientId, clientSecret);
            }

            return update;
        }))
    }

    updateMany(user_id: string, updateProspectionDto: any) {
        return this.ProspectionsDbService.updateMany(user_id, updateProspectionDto);
    }

    remove(user_id: string, id: string, accessToken, refreshToken, clientId, clientSecret) {
        const removeAnswer = this.ProspectionsDbService.remove(id);
        this.synchronizeGoogleSheet(user_id, accessToken, refreshToken, clientId, clientSecret);
        return removeAnswer;
    }

    private async runSynchronizationWithDelay(userDoc: Docs_Db) {
        if (userDoc.lastSynchronization) {
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

    private async synchronizeGoogleSheet(user_id: string, accessToken, refreshToken, clientId, clientSecret) {
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