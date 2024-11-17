import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { User_Db } from '../user/user-db.model';
import { dropAllTables } from './utils/db.utils';
import { estate1 as estate1Model } from './utils/estates.utils';
import { buildApp, buildUser } from './utils/user.utils';
import { Estate_Db } from 'src/estates/estate-db.model';

describe('/api/estates', () => {

    let app: INestApplication;
    let user: User_Db;
    let estate: Estate_Db;

    beforeAll(async () => {

        await dropAllTables();

        user = await buildUser('feff.bezos@amazon.com');
        app = await buildApp(user);

    });

    afterAll(async () => {
        await app.close();
    });

    it('POST /api/estates', async () => {

        const estateResponse = await request(app.getHttpServer())
        .post('/api/estates')
        .send(estate1Model)
        .expect(201);
        expect(estateResponse.body.street).toBe(estate1Model.street);
        expect(estateResponse.body.id).toBeTruthy();
        expect(estateResponse.body.user_id).toBe(user.id);
        estate = estateResponse.body;
    });

    it('POST /api/estates', async () => {

        const estate = await request(app.getHttpServer())
        .post('/api/estates')
        .send(estate1Model)
        .expect(409);
        expect(estate.body.message).toBeTruthy();

    });

    it('PATCH /api/estate', async () => {

        const esateToUpdate = {...estate, plot: 'A1'};

        const estateResponse = await request(app.getHttpServer())
        .patch('/api/estate')
        .send(esateToUpdate)
        .expect(200);
        expect(estateResponse.body.id).toBe(estate.id);
        expect(estateResponse.body.plot).toBe('A1');

    });

    it('GET /api/estates', async () => {
        const response = await request(app.getHttpServer())
            .get('/api/estates')
            .expect(200);
        expect(response.body.length).toEqual(1);
    });

})