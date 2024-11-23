import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { User_Db } from '../user/user-db.model';
import { dropAllTables } from './utils/db.utils';
import { buildApp, buildUser } from './utils/user.utils';
import { Estate_Db } from 'src/estates/estate-db.model';
import { delay } from 'rxjs';
import { Owner_Db } from 'src/owners/owners-db.model';

describe('/api/owners', () => {

    let app: INestApplication;
    let user: User_Db;
    let owner: Owner_Db;
    let jackDorsay;

    beforeAll(async () => {

        await dropAllTables();

        user = await buildUser('bill.gates@microsoft.com');
        app = await buildApp(user);
        await delay(1000);

    });

    afterAll(async () => {
        await app.close();
    });

    it('GET /api/owners', async () => {
        const response = await request(app.getHttpServer())
            .get('/api/owners')
            .expect(200);
        expect(response.body.length).toEqual(1);
        expect(response.body[0].email).toBe('bill.gates@microsoft.com');
        owner = response.body[0];
    });

    it('DELETE /api/owners', async () => {

        await request(app.getHttpServer())
            .delete(`/api/owners`)
            .send({ id: owner.id })
            .expect(200);
        
        const response2 = await request(app.getHttpServer())
            .get('/api/owners')
            .expect(200);
        expect(response2.body.length).toEqual(0);

    });

    // it('POST /api/owners', async () => {

    //     const owner = {
    //         name: 'Jack Dorsey',
    //         street: '123 Market Street',
    //         city: 'San Francisco',
    //         zip: '94107',
    //         email: 'bill.gates@microsoft.com',
    //     }

    //     const ownerResponse = await request(app.getHttpServer())
    //     .post('/api/owners')
    //     .send(owner)
    //     .expect(201);

    //     jackDorsay = ownerResponse.body;

    //     expect(ownerResponse.body.street).toBe(owner.street);
    //     expect(ownerResponse.body.id).toBeTruthy();
    //     expect(ownerResponse.body.user_id).toBe(user.id);
    //     estate = ownerResponse.body;
    // });

    // it('PATCH /api/owners', async () => {
    //     await request(app.getHttpServer())
    //     .patch('/api/owners')
    //     .send({id: jackDorsay.id, signature: 'Jack Dorsey'})
    //     .expect(200);
    // });

    // it('GET /api/owners', async () => {
    //     const response = await request(app.getHttpServer())
    //         .get('/api/owners')
    //         .expect(200);
    //     expect(response.body.length).toEqual(2);
    //     expect(response.body.filter(owner => owner.email === 'bill.gates@microsoft.com').length).toBe(2);
    //     expect(response.body.filter(owner => owner.name === 'Jack Dorsey').length).toBe(1);
    //     expect(response.body.filter(owner => owner.signature === 'Jack Dorsey').length).toBe(1);

    // });

})