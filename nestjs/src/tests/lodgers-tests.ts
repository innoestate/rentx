import * as request from 'supertest';

export const lodgersTests = (getApp) => {

    let lodger;

    it('POST /api/lodgers', async () => {

        const app = getApp();

        const LodgerPostExample = {
            email: 'xavier.niel@free.fr',
            name: 'Xavier Niel'
        }

        const response = await request(app.getHttpServer())
            .post('/api/lodgers')
            .send(LodgerPostExample)
            .expect(201);
        expect(response.body.id).toBeTruthy();
        expect(response.body.email).toBe('xavier.niel@free.fr');
        lodger = response.body;
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

    it('DELETE /api/lodgers', async () => {

        const app = getApp();

        await request(app.getHttpServer())
            .delete(`/api/lodgers`)
            .send({ id: lodger.id })
            .expect(200);

        const response2 = await request(app.getHttpServer())
            .get('/api/lodgers')
            .expect(200);
        expect(response2.body.length).toEqual(0);

    });
}