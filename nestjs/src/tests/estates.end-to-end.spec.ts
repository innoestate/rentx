import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { User_Db } from '../user/user-db.model';
import { dropAllTables } from './utils/db.utils';
import { estate1 } from './utils/estates.utils';
import { buildApp, buildUser } from './utils/user.utils';

describe('/api/estates', () => {

    let app: INestApplication;
    let user: User_Db;

    beforeAll(async () => {

        await dropAllTables();

        user = await buildUser('feff.bezos@amazon.com');
        app = await buildApp(user);

    });

    afterAll(async () => {
        await app.close();
    });

    it('POST /api/estates', async () => {

        const estate = await request(app.getHttpServer())
        .post('/api/estates')
        .send(estate1)
        .expect(201);
        expect(estate.body.street).toBe(estate1.street);
        expect(estate.body.id).toBeTruthy();
        expect(estate.body.user_id).toBe(user.id);

    });

    it('POST /api/estates', async () => {

        const estate = await request(app.getHttpServer())
        .post('/api/estates')
        .send(estate1)
        .expect(409);
        expect(estate.body.message).toBeTruthy();

    });

    it('GET /api/estates', async () => {
        const response = await request(app.getHttpServer())
            .get('/api/estates')
            .expect(200);
        expect(response.body.length).toEqual(1);
    });

})