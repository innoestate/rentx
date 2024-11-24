import * as request from 'supertest';

export const rentsTests = (getApp) => {

    it('GET /api/rents/pdf', async () => {

        const app = getApp();

        const response = await request(app.getHttpServer())
            .post('/api/rents/pdf')
            .expect(200);
        expect(response.body.id).toBeTruthy();
        expect(response.body).toBeTruthy();
    });

}