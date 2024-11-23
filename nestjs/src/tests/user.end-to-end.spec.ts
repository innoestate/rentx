import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { User_Db } from '../user/user-db.model';
import { buildApp, buildUser } from './utils/user.utils';
import { dropAllTables } from './utils/db.utils';

describe('/api/user/hello', () => {

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

    it('GET /api/user/hello', async () => {
        const response = await request(app.getHttpServer())
            .get('/api/user/hello')
            .expect(200);
        expect(response.text).toBe('hello world!');
    });

    it('GET /api/user/profile', async () => {
        const response = await request(app.getHttpServer())
            .get('/api/user/profile')
            .expect(200);

        expect(response.body.email).toBe('elon.musk@spacex.io');
        expect(response.body.id).toBe(user.id); 

    });

    // it('test init', async () => {
    //     expect('hello world!').toBe('hello world!');
    // });

})