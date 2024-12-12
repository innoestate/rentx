import { firstValueFrom } from 'rxjs';
import { RentsDbService } from 'src/rents/rents.db.service';
import { v4 as uuidv4 } from 'uuid';
import * as request from 'supertest';

export const rentsTests = (getApp, getRentsService) => {

    const estate_id = uuidv4();
    const lodger_id = uuidv4();
    let estate = null;

    it('create a rent', async () => {

        const app = getApp();
        const rentService = getRentsService() as RentsDbService;

        const start_date = new Date('2024-12-01');
        const end_date = new Date('2025-12-01');

        await firstValueFrom(rentService.create({ estate_id, lodger_id, start_date, end_date, rent: 1000, charges: 100 }));
        
        const rents = await firstValueFrom(rentService.getByEstate(estate_id));
        expect(rents.length).toBe(1);

    });


    it('GET /api/rents/pdf', async () => {

        const app = getApp();

        const responseEstate = await request(app.getHttpServer())
            .get('/api/estates')
            .expect(200);
        expect(responseEstate.body.length > 0).toBeTruthy();

        const response = await request(app.getHttpServer())
            .get('/api/rents/pdf?estate=' + responseEstate.body[0].id)
            .expect(200);
        expect(response.body).toBeDefined();

    });


}