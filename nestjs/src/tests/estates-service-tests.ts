import { firstValueFrom } from 'rxjs';
import { formatEstateDtoToEstateDb } from '../estates/estate.utils';
import { EstatesService } from '../estates/estates.service';

export const estatesServiceTests = (getApp, getUser, getEstateService) => {  

    const estateExample = {
        street: '1234 Elm St',
        city: 'Los Angeles test',
        zip: '98101'
    };
    let estate;
    
    it('create estate', async () => {
        const user = getUser();
        const estateService = getEstateService() as EstatesService;
        const formatedEstate = formatEstateDtoToEstateDb({...estateExample}, user.id);
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

}