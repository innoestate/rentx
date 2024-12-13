import { firstValueFrom } from 'rxjs';
import * as request from 'supertest';
import { RentsDbService } from '../rents/rents.db.service';

export const rentsTests = (getApp, getRentsService) => {

    let estate = null;

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

}