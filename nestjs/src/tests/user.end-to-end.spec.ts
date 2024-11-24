import { INestApplication } from '@nestjs/common';
import { User_Db } from '../user/user-db.model';
import { dropAllTables } from './utils/db.utils';
import { userTests } from './user-tests';
import { buildApp, buildUser } from './utils/user.utils';
import { ownersTests } from './owners-tests';
import { lodgersTests } from './lodgers-tests';
import { estatesTests } from './estates-tests';
import { rentsTests } from './rents-tests';
import { EstatesService } from '../estates/estates.service';
import { estatesServiceTests } from './estates-service-tests';

describe('/api', () => {

    let app: INestApplication;
    let user: User_Db;
    let estateService: EstatesService;

    beforeAll(async () => {

        await dropAllTables();
        user = await buildUser('elon.musk@spacex.io');
        app = await buildApp(user);
        estateService = app.get<EstatesService>(EstatesService);
    });

    afterAll(async () => {
        await app.close();
    });

    estatesServiceTests(() => app, () => user, () => estateService);

    userTests(() => app, () => user);
    ownersTests(() => app);
    estatesTests(() => app, () => user);
    lodgersTests(() => app);
    rentsTests(() => app);

})
