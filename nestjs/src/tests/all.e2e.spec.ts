import { INestApplication } from '@nestjs/common';
import { DocsDbService } from '../docs/docs.db.service';
import { EstatesService } from '../estates/estates.service';
import { LodgersService } from '../lodgers/lodgers.service';
import { OwnersService } from '../owners/owners.service';
import { RentsDbService } from '../rents/services/rents.db.service';
import { StorageService } from '../storage/services/storage.service';
import { User_Db } from '../user/user-db.model';
import { UsersService } from '../user/user.service';
import { estateTests } from './e2e/estates-tests';
import { lodgersTests } from './e2e/lodgers-tests';
import { offersTests } from './e2e/offers-test';
import { ownersTests } from './e2e/owners-tests';
import { prospectionsTests } from './e2e/prospection-tests';
import { rentsTests } from './e2e/rents-tests';
import { userTests } from './e2e/user-tests';
import { userMock1 } from './mocks/user.mock';
import { prospectionsSpreadsheetTests } from './prospections/prospection.spreadsheets-tests';
import { dropAllTables, emptyingTable } from './utils/db.utils';
import { buildApp } from './utils/user.utils';
import { lastValueFrom } from 'rxjs';

describe('/api', () => {

    let app: INestApplication;
    let user: User_Db;
    let userService: UsersService;
    let ownerService: OwnersService;
    let lodgerService: LodgersService;
    let estateService: EstatesService;
    let rentsDbService: RentsDbService;
    let storageService: StorageService;
    let docsDbService: DocsDbService;

    beforeAll(async () => {
        await dropAllTables();
        app = await buildApp(userMock1);
        mapServices();
        user = await getUser()
    });

    afterAll(async () => {
        await app.close();
        await dropAllTables();
    });

    prospectionsSpreadsheetTests(() => app, () => user, () => docsDbService);
    estateTests(() => app, () => user, () => estateService);
    userTests(() => app, () => user);
    ownersTests(() => app);
    lodgersTests(() => app);
    rentsTests(() => app, () => rentsDbService);
    prospectionsTests(() => app, () => storageService);
    offersTests(() => app);

    const mapServices = () => {
        userService = app.get<UsersService>(UsersService);
        ownerService = app.get<OwnersService>(OwnersService);
        lodgerService = app.get<LodgersService>(LodgersService);
        estateService = app.get<EstatesService>(EstatesService);
        rentsDbService = app.get<RentsDbService>(RentsDbService);
        storageService = app.get<StorageService>(StorageService);
        docsDbService = app.get<DocsDbService>(DocsDbService);
    }

    const getUser = async () => {
        return await userService.findByEmail(userMock1.email)  as any;
    }

})
