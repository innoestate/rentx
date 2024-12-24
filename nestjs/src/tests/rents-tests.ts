import { firstValueFrom } from 'rxjs';
import * as request from 'supertest';
import { RentsDbService } from '../rents/rents.db.service';

export const rentsTests = (getApp, getRentsService) => {

    let estate = null;

    it('GET /api/rents/email', async () => {

        const app = getApp();
        const rentService = getRentsService() as RentsDbService;

        const responseEstate = await request(app.getHttpServer())
            .get('/api/estates')
            .expect(200);
        expect(responseEstate.body.length > 0).toBeTruthy();
        estate = responseEstate.body[0];

        const response = await request(app.getHttpServer())
            .get('/api/rents/email?estate=' + estate.id)
            .expect(200);
        expect(response.body).toBeDefined();

        const rent = await firstValueFrom(rentService.getByEstate(estate.id));
        expect(rent.length).toBe(1);
        expect(rent[0].sent).toBeTruthy();

    });

    it('GET /api/rents/pdf', async () => {

        const app = getApp();
        const rentService = getRentsService() as RentsDbService;

        const responseEstate = await request(app.getHttpServer())
            .get('/api/estates')
            .expect(200);
        expect(responseEstate.body.length > 0).toBeTruthy();
        estate = responseEstate.body[0];

        const response = await request(app.getHttpServer())
            .get('/api/rents/pdf?estate=' + estate.id)
            .expect(200);
        expect(response.body).toBeDefined();

        const rent = await firstValueFrom(rentService.getByEstate(estate.id));
        expect(rent.length).toBe(1);

    });

    it('GET /api/rents/pdf new rent erase if exists', async () => {

        const app = getApp();
        const rentService = getRentsService() as RentsDbService;

        const responseEstate = await request(app.getHttpServer())
            .patch('/api/estate')
            .send({ id: estate.id, rent: 2000})
            .expect(200);
        expect(responseEstate.body).toBeTruthy();

        const response = await request(app.getHttpServer())
            .get('/api/rents/pdf?estate=' + estate.id)
            .expect(200);
        expect(response.body).toBeDefined();

        const rent = await firstValueFrom(rentService.getByEstate(estate.id));
        expect(rent.length).toBe(1);
        expect(rent[0].rent).toBe(2000);

    });

    it('GET /api/rents get monthly rents', async () => {

        const app = getApp();
        const rentService = getRentsService() as RentsDbService;

        const response = await request(app.getHttpServer())
            .get('/api/rents')
            .expect(200);
        expect(response.body).toBeDefined();

        const rents = response.body;
        expect(rents.length).toBe(1);
        expect(rents[0].rents[0].rent).toBe(2000);
        expect(!!rents[0].rents[0].sent).toBe(false);


    });

    it('GET /api/rents/email', async () => {

        const app = getApp();
        const rentService = getRentsService() as RentsDbService;

        const responseEstate = await request(app.getHttpServer())
            .get('/api/estates')
            .expect(200);
        expect(responseEstate.body.length > 0).toBeTruthy();
        estate = responseEstate.body[0];

        const response = await request(app.getHttpServer())
            .get('/api/rents/email?estate=' + estate.id)
            .expect(200);
        expect(response.body).toBeDefined();

        const rentsResponse = await request(app.getHttpServer())
        .get('/api/rents')
        .expect(200);
        expect(rentsResponse.body).toBeDefined();

        const rent = rentsResponse.body[0].rents;
        expect(rent.length).toBe(1);
        expect(rent[0].sent).toBeTruthy();

    });

}