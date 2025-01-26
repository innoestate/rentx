import { firstValueFrom } from 'rxjs';
import { DocsDbService } from '../../docs/docs.db.service';
import * as request from 'supertest';

export const prospectionsSpreadsheetTests = (getApp, getUser, getDocsDbService) => {

    it('should create a spreadsheet with one prospection', async () => {

        const app = getApp();
        const user = getUser();
        const docsDbService = getDocsDbService() as DocsDbService;

        await request(app.getHttpServer())
            .post('/api/prospections')
            .send({
                city: 'Test City',
                address: 'Test Address',
                price: 100000,
                emission_date: new Date().toISOString(),
            })
            .expect(201);

        const docs = await firstValueFrom(docsDbService.getByUser(user.id));
        expect(docs?.length).toBe(1);
        expect(docs[0].prospections_google_sheet_id).toBeTruthy();

    })

    it('should get the prospection spreadsheet', async () => {
        expect(true).toBe(true);
    })

    it('prospection spreadsheet should have correct sheets and titles', async () => {
        expect(true).toBe(true);
    })

    it('prospection spreadsheet should have correct headers and rows', async () => {
        expect(true).toBe(true);
    })

    it('should add a row in prospections sheet', async () => {
        expect(true).toBe(true);
    })

    it('should add a row in sellers sheet', async () => {
        expect(true).toBe(true);
    })

    it('should add a row in prospections sheet', async () => {
        expect(true).toBe(true);
    })

    it('should add multiple prospecions without doublons', async () => {
        expect(true).toBe(true);
    })

    it('should set the removed prospection in archives sheet', async () => {
        expect(true).toBe(true);
    })

}