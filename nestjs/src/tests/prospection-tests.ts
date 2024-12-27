import * as request from 'supertest';

/**
 * Prospection tests
 * 
 * @param {Function} getApp - Function to get the app instance
 * @param {Function} getUser - Function to get the user instance
 */
export const prospectionsTests = (getApp) => {

    it('/prospections (POST)', () => {
        const app = getApp();
        return request(app.getHttpServer())
            .post('/prospections')
            .send({
                city: 'Test City',
                address: 'Test Address',
                price: 100000,
                emission_date: new Date().toISOString(),
            })
            .expect(201);
    });

    // it('/prospections (GET)', () => {
    //     const app = getApp();
    //     return request(app.getHttpServer())
    //         .get('/prospections')
    //         .expect(200)
    //         .expect((res) => {
    //             expect(Array.isArray(res.body)).toBeTruthy();
    //             expect(res.body.length).toEqual(1);
    //         });
    // });

    // it('/prospections (GET) should only return user-specific prospections', () => {
    //     const app = getApp();
    //     const user1 = getUser();
    //     const user2Id = '123e4567-e89b-12d3-a456-426614174001';

    //     // Create prospection for user1
    //     return request(app.getHttpServer())
    //         .post('/prospections')
    //         .send({
    //             city: 'User1 City',
    //             address: 'User1 Address',
    //             price: 100000,
    //             emission_date: new Date().toISOString(),
    //         })
    //         .expect(201)
    //         .then(() => {
    //             // Create prospection for user2
    //             return request(app.getHttpServer())
    //                 .post('/prospections')
    //                 .send({
    //                     city: 'User2 City',
    //                     address: 'User2 Address',
    //                     price: 200000,
    //                     emission_date: new Date().toISOString(),
    //                 })
    //                 .expect(201);
    //         })
    //         .then(() => {
    //             // Mock user1's request
    //             return request(app.getHttpServer())
    //                 .get('/prospections')
    //                 .expect(200)
    //                 .expect((res) => {
    //                     expect(Array.isArray(res.body)).toBeTruthy();
    //                     expect(res.body.length).toEqual(1);
    //                     expect(res.body[0].city).toEqual('User1 City');
    //                 });
    //         });
    // });

    // it('/prospections/:id (PATCH)', () => {
    //     const app = getApp();
    //     const user = getUser();
    //     // First create a prospection
    //     return request(app.getHttpServer())
    //         .post('/prospections')
    //         .send({
    //             city: 'Original City',
    //             address: 'Original Address',
    //             price: 100000,
    //             emission_date: new Date().toISOString(),
    //         })
    //         .expect(201)
    //         .then((res) => {
    //             // Then update it
    //             return request(app.getHttpServer())
    //                 .patch(`/prospections/${res.body.id}`)
    //                 .send({
    //                     city: 'Updated City',
    //                     price: 150000,
    //                 })
    //                 .expect(200)
    //                 .expect((response) => {
    //                     expect(response.body.city).toEqual('Updated City');
    //                     expect(response.body.price).toEqual(150000);
    //                     expect(response.body.address).toEqual('Original Address');
    //                 });
    //         });
    // });

    // it('/prospections/:id (DELETE)', () => {
    //     const app = getApp();
    //     const user = getUser();
    //     // First create a prospection
    //     return request(app.getHttpServer())
    //         .post('/prospections')
    //         .send({
    //             city: 'City to Delete',
    //             address: 'Address to Delete',
    //             price: 100000,
    //             emission_date: new Date().toISOString(),
    //         })
    //         .expect(201)
    //         .then((res) => {
    //             // Then delete it
    //             return request(app.getHttpServer())
    //                 .delete(`/prospections/${res.body.id}`)
    //                 .expect(200);
    //         })
    //         .then(() => {
    //             return request(app.getHttpServer())
    //                 .get('/prospections')
    //                 .expect(200)
    //                 .expect((response) => {
    //                     expect(response.body.length).toEqual(0);
    //                 });
    //         });
    // });

    // it('/prospections/sellers (POST)', () => {
    //     const app = getApp();
    //     return request(app.getHttpServer())
    //         .post('/prospections/sellers')
    //         .send({
    //             name: 'Test Seller',
    //             phone: '1234567890',
    //             email: 'test@example.com',
    //         })
    //         .expect(201);
    // });

    // it('/prospections/sellers/:id (PATCH)', () => {
    //     const app = getApp();
    //     // First create a seller
    //     return request(app.getHttpServer())
    //         .post('/prospections/sellers')
    //         .send({
    //             name: 'Original Name',
    //             phone: '1234567890',
    //             email: 'original@example.com',
    //         })
    //         .expect(201)
    //         .then((res) => {
    //             // Then update it
    //             return request(app.getHttpServer())
    //                 .patch(`/prospections/sellers/${res.body.id}`)
    //                 .send({
    //                     name: 'Updated Name',
    //                     email: 'updated@example.com',
    //                 })
    //                 .expect(200)
    //                 .expect((response) => {
    //                     expect(response.body.name).toEqual('Updated Name');
    //                     expect(response.body.email).toEqual('updated@example.com');
    //                     expect(response.body.phone).toEqual('1234567890');
    //                 });
    //         });
    // });

    // it('/prospections/sellers/:id (DELETE)', () => {
    //     const app = getApp();
    //     return request(app.getHttpServer())
    //         .post('/prospections/sellers')
    //         .send({
    //             name: 'Seller to Delete',
    //             phone: '9876543210',
    //             email: 'delete@example.com',
    //         })
    //         .expect(201)
    //         .then((res) => {
    //             return request(app.getHttpServer())
    //                 .delete(`/prospections/sellers/${res.body.id}`)
    //                 .expect(200);
    //         })
    //         .then(() => {
    //             return request(app.getHttpServer())
    //                 .get('/prospections/sellers')
    //                 .expect(200)
    //                 .expect((response) => {
    //                     const deletedSeller = response.body.find(s => s.email === 'delete@example.com');
    //                     expect(deletedSeller).toBeUndefined();
    //                 });
    //         });
    // });

    // it('/prospections/offers (POST)', () => {
    //     const app = getApp();
    //     const user = getUser();
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