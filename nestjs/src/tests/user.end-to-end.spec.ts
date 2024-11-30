import { INestApplication } from '@nestjs/common';
import { User_Db } from '../user/user-db.model';
import { dropAllTables } from './utils/db.utils';
import { userTests } from './user-tests';
import { buildApp, buildUser } from './utils/user.utils';
import { ownersTests } from './owners-tests';
import { lodgersTests } from './lodgers-tests';
import { rentsTests } from './rents-tests';
import { EstatesService } from '../estates/estates.service';
import { estateTests } from './estates-tests';
import { OwnersService } from '../owners/owners.service';
import { LodgersService } from '../lodgers/lodgers.service';
import { rentsBuisnessTests } from './rents-buisness-tests';

describe('/api', () => {

    let app: INestApplication;
    let user: User_Db;
    let ownerService: OwnersService;
    let lodgerService: LodgersService;
    let estateService: EstatesService;

    beforeAll(async () => {

        await dropAllTables();
        user = await buildUser('elon.musk@spacex.io');
        app = await buildApp(user);
        ownerService = app.get<OwnersService>(OwnersService);
        lodgerService = app.get<LodgersService>(LodgersService);
        estateService = app.get<EstatesService>(EstatesService);
    });

    afterAll(async () => {
        await app.close();
    });

    estateTests(() => app, () => user, () => estateService);
    rentsBuisnessTests(() => estateService, () => ownerService, () => lodgerService);

    userTests(() => app, () => user);
    ownersTests(() => app);
    lodgersTests(() => app);
    rentsTests(() => app);

})
