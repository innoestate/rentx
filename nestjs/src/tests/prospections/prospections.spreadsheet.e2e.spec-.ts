import { INestApplication } from '@nestjs/common';
import { DocsDbService } from '../../docs/docs.db.service';
import { User_Db } from '../../user/user-db.model';
import { dropAllTables } from '../utils/db.utils';
import { buildApp, buildUser } from '../utils/user.utils';
import { prospectionsSpreadsheetTests } from './prospection.spreadsheets-tests';

describe('/api', () => {

    let app: INestApplication;
    let user: User_Db;
    let docsDbService: DocsDbService;

    beforeAll(async () => {

        await dropAllTables();
        user = await buildUser('elon.musk@spacex.io');
        app = await buildApp(user);
        docsDbService = app.get<DocsDbService>(DocsDbService);
        
    });

    afterAll(async () => {
        await app.close();
    });

    prospectionsSpreadsheetTests(() => app, () => user, () => docsDbService);

})
