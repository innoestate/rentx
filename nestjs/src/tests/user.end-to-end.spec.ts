import { INestApplication } from '@nestjs/common';
import { EstatesService } from '../estates/estates.service';
import { LodgersService } from '../lodgers/lodgers.service';
import { OwnersService } from '../owners/owners.service';
import { RentsDbService } from '../rents/rents.db.service';
import { User_Db } from '../user/user-db.model';
import { estateTests } from './estates-tests';
import { lodgersTests } from './lodgers-tests';
import { ownersTests } from './owners-tests';
import { rentsTests } from './rents-tests';
import { userTests } from './user-tests';
import { dropAllTables } from './utils/db.utils';
import { buildApp, buildUser } from './utils/user.utils';

describe('/api', () => {

    let app: INestApplication;
    let user: User_Db;
    let ownerService: OwnersService;
    let lodgerService: LodgersService;
    let estateService: EstatesService;
    let rentsService: RentsDbService;

    beforeAll(async () => {

        await dropAllTables();
        user = await buildUser('elon.musk@spacex.io');
        app = await buildApp(user);
        ownerService = app.get<OwnersService>(OwnersService);
        lodgerService = app.get<LodgersService>(LodgersService);
        estateService = app.get<EstatesService>(EstatesService);
        rentsService = app.get<RentsDbService>(RentsDbService);
    });

    afterAll(async () => {
        await app.close();
    });

    estateTests(() => app, () => user, () => estateService);
    userTests(() => app, () => user);
    ownersTests(() => app);
    lodgersTests(() => app);
    rentsTests(() => app, () => rentsService);

})
