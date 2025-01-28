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
            email: 'jackdorsey@twitter.com',
            signature: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAAAXNSR0IArs4c6QAABSNJREFUeF7t1sFNXFEQRNFHBmRkUnEGZIDJjIwgBDMSSLNCohYFpTneePX1mtOtq7k7/hEgQGBE4G5kTmMSIEDgCJYjIEBgRkCwZlZlUAIEBMsNECAwIyBYM6syKAECguUGCBCYERCsmVUZlAABwXIDBAjMCAjWzKoMSoCAYLkBAgRmBARrZlUGJUBAsNwAAQIzAoI1syqDEiAgWG6AAIEZAcGaWZVBCRAQLDdAgMCMgGDNrMqgBAgIlhsgQGBGQLBmVmVQAgQEyw0QIDAjIFgzqzIoAQKC5QYIEJgREKyZVRmUAAHBcgMECMwICNbMqgxKgIBguQECBGYEBGtmVQYlQECw3AABAjMCgjWzKoMSICBYboAAgRkBwZpZlUEJEBAsN0CAwIyAYM2syqAECAiWGyBAYEZAsGZWZVACBATLDRAgMCMgWDOrMigBAoLlBggQmBEQrJlVGZQAAcFyAwQIzAgI1syqDEqAgGC5AQIEZgQEa2ZVBiVAQLDcAAECMwKCNbMqgxIgIFhugACBGQHBmlmVQQkQECw3QIDAjIBgzazKoAQICJYbIEBgRkCwZlZlUAIEBMsNECAwIyBYM6syKAECguUGCBCYERCsmVUZlAABwXIDBAjMCAjWzKoMSoCAYLkBAgRmBARrZlUGJUBAsNwAAQIzAoI1syqDEiAgWG6AAIEZAcGaWZVBCRAQLDdAgMCMgGDNrMqgBAgIlhsgQGBGQLBmVmVQAgQEyw0QIDAjIFgzqzIoAQKC5QYIEJgREKyZVRmUAAHBcgMECMwICNbMqgxKgIBguQECBGYEBGtmVQYlQECw3AABAjMCgjWzKoMSICBYboAAgRkBwZpZlUEJEBAsN0CAwIyAYM2syqAECAiWGyBAYEZAsGZWZVACBATLDRAgMCMgWDOrMigBAoLlBggQmBEQrJlVGfRK4OGc80Lk9gQE6/Z2vvwXX0L19B6ry//P73/Iv+U/xuzfFxCs75v5oi9wHarPX1aXYPmV1d/Fj74oWD/K7/EvBB7POffnnD8fv6gucRKpGz8ZwbrxA/jFf/7rOeftnPPXL6lfvKXyaIJVBvccAQK5gGDldr4kQKAsIFhlcM8RIJALCFZu50sCBMoCglUG9xwBArmAYOV2viRAoCwgWGVwzxEgkAsIVm7nSwIEygKCVQb3HAECuYBg5Xa+JECgLCBYZXDPESCQCwhWbudLAgTKAoJVBvccAQK5gGDldr4kQKAsIFhlcM8RIJALCFZu50sCBMoCglUG9xwBArmAYOV2viRAoCwgWGVwzxEgkAsIVm7nSwIEygKCVQb3HAECuYBg5Xa+JECgLCBYZXDPESCQCwhWbudLAgTKAoJVBvccAQK5gGDldr4kQKAsIFhlcM8RIJALCFZu50sCBMoCglUG9xwBArmAYOV2viRAoCwgWGVwzxEgkAsIVm7nSwIEygKCVQb3HAECuYBg5Xa+JECgLCBYZXDPESCQCwhWbudLAgTKAoJVBvccAQK5gGDldr4kQKAsIFhlcM8RIJALCFZu50sCBMoCglUG9xwBArmAYOV2viRAoCwgWGVwzxEgkAsIVm7nSwIEygKCVQb3HAECuYBg5Xa+JECgLCBYZXDPESCQCwhWbudLAgTKAoJVBvccAQK5gGDldr4kQKAsIFhlcM8RIJALCFZu50sCBMoCglUG9xwBArmAYOV2viRAoCwgWGVwzxEgkAsIVm7nSwIEygKCVQb3HAECuYBg5Xa+JECgLPAfkAIMl8hXyWIAAAAASUVORK5CYII=",

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
            email: 'eafeaf@efef',
        }
        await request(app.getHttpServer())
            .patch('/api/owners')
            .send(ownerExample2)
            .expect(200);
        // expect(response.body.id).toBeTruthy();
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
            .send({ id: estate.id, owner_id: owner2.id })
            .expect(200);

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