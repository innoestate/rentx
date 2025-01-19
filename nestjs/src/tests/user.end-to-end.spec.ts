import { INestApplication } from '@nestjs/common';
import { StorageService } from '../storage/services/storage.service';
import { EstatesService } from '../estates/estates.service';
import { LodgersService } from '../lodgers/lodgers.service';
import { OwnersService } from '../owners/owners.service';
import { RentsDbService } from '../rents/services/rents.db.service';
import { User_Db } from '../user/user-db.model';
import { estateTests } from './estates-tests';
import { lodgersTests } from './lodgers-tests';
import { ownersTests } from './owners-tests';
import { prospectionsTests } from './prospection-tests';
import { rentsTests } from './rents-tests';
import { userTests } from './user-tests';
import { dropAllTables } from './utils/db.utils';
import { buildApp, buildUser } from './utils/user.utils';
import { offersTests } from './offers-test';

describe('/api', () => {

    let app: INestApplication;
    let user: User_Db;
    let ownerService: OwnersService;
    let lodgerService: LodgersService;
    let estateService: EstatesService;
    let rentsDbService: RentsDbService;
    let storageService: StorageService;

    beforeAll(async () => {

        await dropAllTables();
        user = await buildUser('elon.musk@spacex.io');
        app = await buildApp(user);
        ownerService = app.get<OwnersService>(OwnersService);
        lodgerService = app.get<LodgersService>(LodgersService);
        estateService = app.get<EstatesService>(EstatesService);
        rentsDbService = app.get<RentsDbService>(RentsDbService);
        storageService = app.get<StorageService>(StorageService);
        
    });

    afterAll(async () => {
        await app.close();
    });

    estateTests(() => app, () => user, () => estateService);
    userTests(() => app, () => user);
    ownersTests(() => app);
    lodgersTests(() => app);
    rentsTests(() => app, () => rentsDbService);
    prospectionsTests(() => app, () => storageService);
    offersTests(() => app);

})
