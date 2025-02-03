import * as request from 'supertest';

export const userTests = (getApp, getUser) => {

    it('GET /api/user/hello', async () => {

        const app = getApp();
        const user = getUser();

        const response = await request(app.getHttpServer())
            .get('/api/user/hello')
            .expect(200);
        expect(response.text).toBe('hello world!');
    });

    it('GET /api/user/profile', async () => {

        const app = getApp();
        const user = getUser();

        const response = await request(app.getHttpServer())
            .get('/api/user/profile')
            .expect(200);

        expect(response.body.email).toBe('elon.musk@spacex.io');
        expect(response.body.id).toBe(user.id); 

    });
    
}
