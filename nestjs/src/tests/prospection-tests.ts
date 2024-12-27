import * as request from 'supertest';


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


    it('/prospections (GET)', () => {
        const app = getApp();
        return request(app.getHttpServer())
            .get('/prospections')
            .expect(200)
            .expect((res) => {
                expect(Array.isArray(res.body)).toBeTruthy();
                expect(res.body.length).toEqual(1);
            });
    });

    it('/prospections/sellers (POST)', () => {
        const app = getApp();
        return request(app.getHttpServer())
            .post('/prospections/sellers')
            .send({
                name: 'Test Seller',
                phone: '1234567890',
                email: 'test@example.com',
            })
            .expect(201);
    });

    it('/prospections/offers (POST)', () => {
        const app = getApp();
        // First create a prospection to get its ID
        return request(app.getHttpServer())
            .post('/prospections')
            .send({
                city: 'Test City',
                address: 'Test Address',
                price: 100000,
                emission_date: new Date().toISOString(),
            })
            .expect(201)
            .then((res) => {
                const prospectionId = res.body.id;
                return request(app.getHttpServer())
                    .post('/prospections/offers')
                    .send({
                        price: 95000,
                        prospection_id: prospectionId,
                    })
                    .expect(201);
            });
    });

};

// describe('ProspectionsController (', () => {
//     let app: INestApplication;

//     beforeEach(async () => {
//         const moduleFixture: TestingModule = await Test.createTestingModule({
//             imports: [
//                 TypeOrmModule.forRoot({
//                     type: 'postgres',
//                     host: 'localhost',
//                     port: 5432,
//                     username: 'test',
//                     password: 'test',
//                     database: 'test',
//                     entities: [Prospection_Entity, Seller_Entity, Offer_Entity],
//                     synchronize: true,
//                 }),
//                 ProspectionsModule,
//             ],
//         }).compile();

//         app = moduleFixture.createNestApplication();
//         await app.init();
//     });

//     it('/prospections (POST)', () => {
//         return request(app.getHttpServer())
//             .post('/prospections')
//             .send({
//                 city: 'Test City',
//                 address: 'Test Address',
//                 price: 100000,
//                 emission_date: new Date().toISOString(),
//             })
//             .expect(201);
//     });

//     it('/prospections (GET)', () => {
//         return request(app.getHttpServer())
//             .get('/prospections')
//             .expect(200)
//             .expect((res) => {
//                 expect(Array.isArray(res.body)).toBeTruthy();
//             });
//     });

//     it('/prospections/sellers (POST)', () => {
//         return request(app.getHttpServer())
//             .post('/prospections/sellers')
//             .send({
//                 name: 'Test Seller',
//                 phone: '1234567890',
//                 email: 'test@example.com',
//             })
//             .expect(201);
//     });

//     it('/prospections/offers (POST)', () => {
//         // First create a prospection to get its ID
//         return request(app.getHttpServer())
//             .post('/prospections')
//             .send({
//                 city: 'Test City',
//                 address: 'Test Address',
//                 price: 100000,
//                 emission_date: new Date().toISOString(),
//             })
//             .expect(201)
//             .then((res) => {
//                 const prospectionId = res.body.id;
//                 return request(app.getHttpServer())
//                     .post('/prospections/offers')
//                     .send({
//                         price: 95000,
//                         prospection_id: prospectionId,
//                     })
//                     .expect(201);
//             });
//     });

//     afterAll(async () => {
//         await app.close();
//     });
// });
