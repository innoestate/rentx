import * as request from 'supertest';

export const ownersTests = (getApp) => {

    let owner;
    let owner2;

    it('GET /api/owners', async () => {

        const app = getApp();

        const response = await request(app.getHttpServer())
            .get('/api/owners')
            .expect(200);
        expect(response.body.length).toEqual(1);
        expect(response.body[0].email).toBe('elon.musk@spacex.io');
        owner = response.body[0];
    });

    it('POST /api/owners', async () => {

        const app = getApp();

        const ownerExample2 = {
            name: 'Jack Dorsey',
            street: '123 Market Street',
            city: 'San Francisco',
            zip: '94107',
            email: 'jackdorsey@twitter.com'
        }
        const response = await request(app.getHttpServer())
            .post('/api/owners')
            .send(ownerExample2)
            .expect(201);
        expect(response.body.id).toBeTruthy();
        expect(response.body.email).toBe('jackdorsey@twitter.com');
        owner2 = response.body;
    });

    it('PATCH /api/owners', async () => {

        const app = getApp();
        const ownerExample2 = {
            id: owner2.id,
            name: 'Jack Dorsey',
            street: '123 Market Street',
            city: 'San Francisco',
            zip: '94107',
            email: 'eafeaf@efef'
        }
        const response = await request(app.getHttpServer())
            .patch('/api/owners')
            .send(ownerExample2)
            .expect(200);
        // expect(response.body.id).toBeTruthy();
    });

    it('DELETE /api/owners', async () => {

        const app = getApp();

        await request(app.getHttpServer())
            .delete(`/api/owners`)
            .send({ id: owner.id })
            .expect(200);

        const response2 = await request(app.getHttpServer())
            .get('/api/owners')
            .expect(200);
        expect(response2.body.length).toEqual(1);

    });
}