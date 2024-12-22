import { MockedGoogleSpreadSheetStrategy } from "../rents/spreadsheets/strategies/spreadsheets.mocked.strategy";
import { RentsService } from "../rents/rents.service";
import * as request from 'supertest';
import { User_Db } from "src/user/user-db.model";
import { lastValueFrom } from "rxjs";

export const rentsServiceTests = (getApp, getRentsService) => {

    let user: User_Db = null;
    let estate = null;
    let spreadSheetId = null;

    it('addToExcel test', async () => {

        const app = getApp();
        const rentService = getRentsService() as RentsService;

        const fakeSpreadSheetStrategy = new MockedGoogleSpreadSheetStrategy();

        const response = await request(app.getHttpServer())
        .get('/api/user/profile')
        .expect(200);

        user = response.body;
        expect(user.email).toBe('elon.musk@spacex.io');

        const spreadSheet = await lastValueFrom(rentService.addPeriodToExcel(user.id, '0', new Date('2024-01-01'), new Date('2024-01-31'), fakeSpreadSheetStrategy));
        spreadSheetId = spreadSheet.rents_google_sheet_id;
        expect(spreadSheet).not.toBeNull(); 

    });

    it('override sheet test', async () => {
        
        const rentService = getRentsService() as RentsService;

        const fakeSpreadSheetStrategy = new MockedGoogleSpreadSheetStrategy();

        const spreadSheetOverrided = await lastValueFrom(rentService.addPeriodToExcel(user.id, '0', new Date('2024-01-01'), new Date('2024-01-31'), fakeSpreadSheetStrategy));

        expect(spreadSheetOverrided.rents_google_sheet_id).toEqual(spreadSheetId); 

    })

}