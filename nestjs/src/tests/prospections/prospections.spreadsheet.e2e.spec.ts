import { INestApplication } from '@nestjs/common';
import { ProspectionSpreadsheetService } from '../../prospections/services/spreadsheets.prospection.service';
import { User_Db } from '../../user/user-db.model';
import { prospectionsSpreadsheetTests } from './prospection.spreadsheets-tests';
import { dropAllTables } from '../utils/db.utils';
import { buildApp, buildUser } from '../utils/user.utils';

describe('/api', () => {

    let app: INestApplication;
    let user: User_Db;
    let prospectionSpreadsheetService: ProspectionSpreadsheetService;

    beforeAll(async () => {

        await dropAllTables();
        user = await buildUser('elon.musk@spacex.io');
        app = await buildApp(user);
        prospectionSpreadsheetService = app.get<ProspectionSpreadsheetService>(ProspectionSpreadsheetService);
        
    });

    afterAll(async () => {
        await app.close();
    });

    prospectionsSpreadsheetTests(() => app, () => user, () => prospectionSpreadsheetService);

})
