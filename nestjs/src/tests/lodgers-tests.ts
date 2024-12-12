import * as request from 'supertest';

export const lodgersTests = (getApp) => {

    let lodger;
    let lodger2;

    it('POST /api/lodgers', async () => {

        const app = getApp();

        const LodgerPostExample = {
            email: 'xavier.niel@free.fr',
            name: 'Xavier Niel',
        }
        const response = await request(app.getHttpServer())
            .post('/api/lodgers')
            .send(LodgerPostExample)
            .expect(201);
        expect(response.body.id).toBeTruthy();
        expect(response.body.email).toBe('xavier.niel@free.fr');
        lodger = response.body;
    });

    it('PATCH /api/estates set lodger to estate', async () => { 

        const app = getApp();

        const estatesResponse = await request(app.getHttpServer())
            .get('/api/estates')
            .expect(200);
        expect(estatesResponse.body.length > 0).toBeTruthy();
        const estate = estatesResponse.body[0];

        await request(app.getHttpServer())
            .patch('/api/estate')
            .send({ id: estate.id, lodger_id: lodger.id })
            .expect(200);

    });

    it('GET /api/lodgers', async () => {

        const app = getApp();

        const response = await request(app.getHttpServer())
            .get('/api/lodgers')
            .expect(200);
        expect(response.body.length).toEqual(1);
        expect(response.body[0].email).toBe('xavier.niel@free.fr');
        lodger = response.body[0];
    });

    it('PATCH /api/lodgers', async () => {
            
        const app = getApp();
    
        await request(app.getHttpServer())
            .patch('/api/lodgers')
            .send({id: lodger.id, email: 'xavier.niel@free.ai'})
            .expect(200);

        const response = await request(app.getHttpServer())
            .get('/api/lodgers')
            .expect(200);
        expect(response.body.length).toEqual(1);
        expect(response.body[0].email).toBe('xavier.niel@free.ai');
        lodger = response.body[0];
    });

    it('POST /api/lodgers', async () => {

        const app = getApp();

        const LodgerPostExample = {
            email: 'jack.ma@alibaba.se',
            name: 'Jack Ma',
        }
        const response = await request(app.getHttpServer())
            .post('/api/lodgers')
            .send(LodgerPostExample)
            .expect(201);
        expect(response.body.id).toBeTruthy();
        expect(response.body.email).toBe('jack.ma@alibaba.se');
        lodger2 = response.body;
    });

    it('DELETE /api/lodgers', async () => {

        const app = getApp();

        await request(app.getHttpServer())
            .delete(`/api/lodgers`)
            .send({ id: lodger2.id })
            .expect(200);

        const response2 = await request(app.getHttpServer())
            .get('/api/lodgers')
            .expect(200);
        expect(response2.body.length).toEqual(1);

    });
}