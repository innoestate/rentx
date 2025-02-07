import * as request from 'supertest';

export const alphaUserTests = (getApp) => {

    it('GET /api/alpha/addUser', async () => {

        const app = getApp();

        const response = await request(app.getHttpServer())
            .post('/api/alpha/addUser')
            .send({
                email: 'albert.einstein@test.com',
            })
            .expect(201);

        console.log('response', response.body);
        expect(response.body.id).toBeTruthy();
        expect(response.body.email).toBe('albert.einstein@test.com');
    });

}
