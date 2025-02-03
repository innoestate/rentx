import { firstValueFrom } from 'rxjs';
import { formatEstateDtoToEstateDb } from '../../estates/estate.utils';
import { EstatesService } from '../../estates/estates.service';
import * as request from 'supertest';
import { estateMock1, estateMock2 } from '../mocks/estates.mock';

export const estateTests = (getApp, getUser, getEstateService) => {  
    
    let estate;

    it('create estate', async () => {
        const user = getUser();
        const estateService = getEstateService() as EstatesService;
        const formatedEstate = formatEstateDtoToEstateDb({...estateMock1}, user.id);
        estate = await firstValueFrom(estateService.create(formatedEstate));
        expect(estate.id).toBeTruthy();
    });

    it('get estate by id', async () => {
        const estateService = getEstateService() as EstatesService;
        const estateById = await firstValueFrom(estateService.getById(estate.id));
        expect(estateById.id).toEqual(estate.id);
    });

    it('remove estate', async () => {
        const user = getUser();
        const estateService = getEstateService() as EstatesService;
        await firstValueFrom(estateService.delete(estate.id));
        const estates = await estateService.getByUser(user.id);
        expect(estates.filter(estate_ => estate_.id === estate.id).length).toEqual(0);
    });

    it('POST /api/estates', async () => {
        const app = getApp();
        const response = await request(app.getHttpServer())
            .post('/api/estates')
            .send(estateMock2)
            .expect(201);
        expect(response.body.id).toBeTruthy();
    });

}