import * as request from 'supertest';

export const rentsTests = (getApp) => {

    it('GET /api/rents/pdf', async () => {

        const app = getApp();
        const response = await request(app.getHttpServer())
            .get('/api/rents/pdf')
            .expect(200)
            .expect('Content-Type', 'application/pdf')
            .expect('Content-Disposition', 'attachment; filename=quittance.pdf');
        expect(response.body).toBeTruthy();
    });

}