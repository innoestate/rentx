import { firstValueFrom } from 'rxjs';
import { DocsDbService } from '../../docs/docs.db.service';
import * as request from 'supertest';
import { ProspectionMocked1, ProspectionMocked2 } from '../../prospections/spreadsheets/tests/mocks/prospections.mocked';
import { emptyingTable } from '../utils/db.utils';

export const prospectionsSpreadsheetTests = (getApp, getUser, getDocsDbService) => {

    let spreadsheetId;

    it('should create a spreadsheet with one prospection', async () => {

        await emptyingTable('prospections');
        await emptyingTable('sellers');

        const app = getApp();
        const user = getUser();
        const docsDbService = getDocsDbService() as DocsDbService;

        const prospectionMockedDto = {...ProspectionMocked1};
        delete prospectionMockedDto.id;
        delete prospectionMockedDto.seller_id;
        delete prospectionMockedDto.offer_id;


        await request(app.getHttpServer())
            .post('/api/prospections')
            .send(prospectionMockedDto)
            .expect(201);

        const docs = await firstValueFrom(docsDbService.getByUser(user.id));
        expect(docs?.length).toBe(1);
        expect(docs[0].prospections_google_sheet_id).toBeTruthy();
        spreadsheetId = docs[0].prospections_google_sheet_id;

    })

    it('should get the prospection spreadsheet', async () => {
        const app = getApp();
        const user = getUser();
        const docsDbService = getDocsDbService() as DocsDbService;

        const prospectionMockedDto = {...ProspectionMocked2};
        delete prospectionMockedDto.id;
        delete prospectionMockedDto.seller_id;
        delete prospectionMockedDto.offer_id;

        await request(app.getHttpServer())
            .post('/api/prospections')
            .send(prospectionMockedDto)
            .expect(201);

        const docs = await firstValueFrom(docsDbService.getByUser(user.id));
        expect(docs?.length).toBe(1);
        expect(docs[0].prospections_google_sheet_id).toEqual(spreadsheetId);
    })

}