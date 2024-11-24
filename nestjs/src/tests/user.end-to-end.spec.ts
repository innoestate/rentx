import { INestApplication } from '@nestjs/common';
import { User_Db } from '../user/user-db.model';
import { dropAllTables } from './utils/db.utils';
import { userTests } from './user-tests';
import { buildApp, buildUser } from './utils/user.utils';
import { ownersTests } from './owners-tests';
import { lodgersTests } from './lodgers-tests';
import { estatesTests } from './estates-tests';
import { rentsTests } from './rents-tests';

describe('/api', () => {

    let app: INestApplication;
    let user: User_Db;

    beforeAll(async () => {

        await dropAllTables();
        user = await buildUser('elon.musk@spacex.io');
        app = await buildApp(user);

    });

    afterAll(async () => {
        await app.close();
    });

    userTests(() => app, () => user);
    ownersTests(() => app);
    estatesTests(() => app, () => user);
    lodgersTests(() => app);
    rentsTests(() => app);

})
