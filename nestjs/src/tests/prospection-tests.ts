import * as request from 'supertest';

/**
 * Prospection tests
 * 
 * @param {Function} getApp - Function to get the app instance
 * @param {Function} getUser - Function to get the user instance
 */
export const prospectionsTests = (getApp) => {

    it('/api/prospections (POST)', () => {
        const app = getApp();
        return request(app.getHttpServer())
            .post('/api/prospections')
            .send({
                city: 'Test City',
                address: 'Test Address',
                price: 100000,
                emission_date: new Date().toISOString(),
            })
            .expect(201);
    });

    it('/api/prospections (GET)', () => {
        const app = getApp();
        return request(app.getHttpServer())
            .get('/api/prospections')
            .expect(200)
            .expect((res) => {
                expect(Array.isArray(res.body)).toBeTruthy();
                expect(res.body.length).toEqual(1);
            });
    });

    it('/api/prospections (GET) should only return user-specific prospections', () => {
        const app = getApp();

        return request(app.getHttpServer())
            .post('/api/prospections')
            .send({
                city: 'User1 City',
                address: 'User1 Address',
                price: 100000,
                emission_date: new Date().toISOString(),
            })
            .expect(201)
            .then(async () => {
                const res = await request(app.getHttpServer())
                    .get('/api/prospections')
                    .expect(200);

                expect(Array.isArray(res.body)).toBeTruthy();
                expect(res.body.length).toEqual(2);
                expect(res.body.find(p => p.city === 'User1 City').city).toEqual('User1 City');

            });
    });

    let prospectionIdForPatchTests = '';
    it('/api/prospections/:id (PATCH)', async () => {
        const app = getApp();

        const resCreate = await request(app.getHttpServer())
            .post('/api/prospections')
            .send({
                city: 'Original City',
                address: 'Original Address',
                price: 100000,
                emission_date: new Date().toISOString(),
            })
            .expect(201)

        prospectionIdForPatchTests = resCreate.body.id;

        await request(app.getHttpServer())
            .patch(`/api/prospections/${prospectionIdForPatchTests}`)
            .send({
                city: 'Updated City',
                price: 150000,
            })

        const resGet = await request(app.getHttpServer())
            .get(`/api/prospections/${prospectionIdForPatchTests}`)
            .expect(200);

        expect(resGet.body.city).toEqual('Updated City');
        expect(resGet.body.price).toEqual(150000);
        expect(resGet.body.address).toEqual('Original Address');

    });

    it('/api/prospections/:id (PATCH)', async () => {

        const app = getApp();

        await request(app.getHttpServer())
            .patch(`/api/prospections/${prospectionIdForPatchTests}`)
            .send({
                seller_id: '35bfd1bf-1956-4077-a6af-aa1e5076219a',
            })

        const resGet = await request(app.getHttpServer())
            .get(`/api/prospections/${prospectionIdForPatchTests}`)
            .expect(200);

        expect(resGet.body.city).toEqual('Updated City');
        expect(resGet.body.price).toEqual(150000);
        expect(resGet.body.address).toEqual('Original Address');
        expect(resGet.body.seller_id).toEqual('35bfd1bf-1956-4077-a6af-aa1e5076219a');
    });

    it('/api/prospections/:id (DELETE)', () => {
        const app = getApp();
        let id = '';
        // First create a prospection
        return request(app.getHttpServer())
            .post('/api/prospections')
            .send({
                city: 'City to Delete',
                address: 'Address to Delete',
                price: 100000,
                emission_date: new Date().toISOString(),
            })
            .expect(201)
            .then((res) => {
                id = res.body.id;
                // Then delete it
                return request(app.getHttpServer())
                    .delete(`/api/prospections/${res.body.id}`)
                    .expect(200);
            })
            .then(async () => {
                const res = await request(app.getHttpServer())
                    .get('/api/prospections')
                    .expect(200);
                expect(res.body.filter(p => p.id === id).length).toEqual(0);
            });
    });

    it('/api/prospections/sellers (POST)', () => {
        const app = getApp();
        return request(app.getHttpServer())
            .post('/api/prospections/sellers')
            .send({
                name: 'Test Seller',
                phone: '1234567890',
                email: 'test@example.com',
            })
            .expect(201);
    });

    it('/api/prospections/sellers/:id (PATCH)', () => {
        const app = getApp();
        // First create a seller
        return request(app.getHttpServer())
            .post('/api/prospections/sellers')
            .send({
                name: 'Original Name',
                phone: '1234567890',
                email: 'original@example.com',
            })
            .expect(201)
            .then((res) => {
                return request(app.getHttpServer())
                    .patch(`/api/prospections/sellers/${res.body.id}`)
                    .send({
                        name: 'Updated Name',
                        email: 'updated@example.com'
                    })
                    .expect(200)
                    .expect((response) => {
                        expect(response.body.name).toEqual('Updated Name');
                        expect(response.body.email).toEqual('updated@example.com');
                        expect(response.body.phone).toEqual('1234567890');
                    });
            });
    });

    it('/api/prospections/sellers/:id (DELETE)', () => {
        const app = getApp();
        return request(app.getHttpServer())
            .post('/api/prospections/sellers')
            .send({
                name: 'Seller to Delete',
                phone: '9876543210',
                email: 'delete@example.com',
            })
            .expect(201)
            .then((res) => {
                return request(app.getHttpServer())
                    .delete(`/api/prospections/sellers/${res.body.id}`)
                    .expect(200);
            })
            .then(async () => {
                const res = await request(app.getHttpServer())
                    .get('/api/prospections/sellers/all')
                    .expect(200);
                const deletedSeller = res.body.find(s => s.email === 'delete@example.com');
                expect(deletedSeller).toBeUndefined();
            });
    });


    it('/api/prospections/sellers/:id (DELETE) should only delete prospection seller_id that is concerned', async () => {
        const app = getApp();

        const sellerResponse = await request(app.getHttpServer())
            .post('/api/prospections/sellers')
            .send({
                name: 'Seller to Delete',
                phone: '9876543210',
                email: 'delete@example.com',
            });

        const sellerId = sellerResponse.body.id;

        const prospection1Response = await request(app.getHttpServer())
            .post('/api/prospections')
            .send({
                city: 'Test City 2',
                address: 'Test Address X',
                price: 200000,
                emission_date: new Date().toISOString(),
                seller_id: sellerId
            })
        const prospection1Id = prospection1Response.body.id;

        const prospection2Response = await request(app.getHttpServer())
            .post('/api/prospections')
            .send({
                city: 'Test City 2',
                address: 'Test Address X',
                price: 200000,
                emission_date: new Date().toISOString(),
                seller_id: sellerId
            })

        const prospection2Id = prospection2Response.body.id;

        expect(prospection1Response.body.seller_id).toEqual(sellerId);
        expect(prospection2Response.body.seller_id).toEqual(sellerId);

        await request(app.getHttpServer())
            .delete(`/api/prospections/sellers/${sellerId}`)
            .expect(200);

        const sellersRes = await request(app.getHttpServer())
            .get('/api/prospections/sellers/all')
            .expect(200);

        const deletedSeller = sellersRes.body.find(s => s.email === 'delete@example.com');
        expect(deletedSeller).toBeUndefined();

        const prospection1Updated = await request(app.getHttpServer())
            .get(`/api/prospections/${prospection1Id}`)
            .expect(200);

        expect(prospection1Updated.body.seller_id).toBeNull();

        const prospection2Updated = await request(app.getHttpServer())
            .get(`/api/prospections/${prospection2Id}`)
            .expect(200);

        expect(prospection2Updated.body.seller_id).toBeNull();

    });

    // it('/prospections/offers (POST)', () => {
    //     const app = getApp();
    //     // First create a prospection to get its ID
    //     return request(app.getHttpServer())
    //         .post('/prospections')
    //         .send({
    //             city: 'Test City',
    //             address: 'Test Address',
    //             price: 100000,
    //             emission_date: new Date().toISOString(),
    //         })
    //         .expect(201)
    //         .then((res) => {
    //             const prospectionId = res.body.id;
    //             return request(app.getHttpServer())
    //                 .post('/prospections/offers')
    //                 .send({
    //                     price: 95000,
    //                     prospection_id: prospectionId,
    //                 })
    //                 .expect(201);
    //         });
    // });

};