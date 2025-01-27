import { firstValueFrom } from 'rxjs';
import { DocsDbService } from '../../docs/docs.db.service';
import * as request from 'supertest';

export const docsDbTests = (getApp, getUser, getDocsDbService) => {

    let doc;

    it('should create a doc with no content', async () => {

        const app = getApp();
        const user = getUser();
        const docsDbService = getDocsDbService() as DocsDbService;

        console.log('user', user);

        await firstValueFrom(docsDbService.create({ user_id: user?.id}));
        const docs = await firstValueFrom(docsDbService.getByUser(user?.id));
        expect(docs?.length).toBe(1);
        expect(docs[0].user_id).toBe(user?.id);
        doc = docs[0];
    })

    it('should update the doc with a propsections_google_sheet_id and lastSynchronization', async () => {
        
        const user = getUser();
        const docsDbService = getDocsDbService() as DocsDbService;

        console.log('user', user);
        const date = new Date();

        await firstValueFrom(docsDbService.update({ id: doc.id, prospections_google_sheet_id: '123', lastSynchronization: date }));
        const docs = await firstValueFrom(docsDbService.getByUser(user?.id));
        console.log('docs', docs);
        expect(docs?.length).toBe(1);
        expect(docs[0].user_id).toBe(user?.id);
        expect(docs[0].prospections_google_sheet_id).toBe('123');
        expect(docs[0].lastSynchronization).toEqual(date);
    
    })  

}