import { lastValueFrom } from 'rxjs';
import { Estate_Dto } from '../estates/estate-dto.model';
import { formatEstateDtoToEstateDb } from '../estates/estate.utils';
import { EstatesService } from '../estates/estates.service';
import { Lodger_Post } from '../lodgers/lodger-post.model';
import { LodgersService } from '../lodgers/lodgers.service';
import { Owner_Dto } from '../owners/owners-dto.model';
import { OwnersService } from '../owners/owners.service';
import { formatLodgerPost } from '../lodgers/lodger-utils.model';
import { formatOwnerDtoToOwnerDb } from '../owners/owners.utils';

const userId = 'c045b437-be01-4479-8598-9a4dc7dbe1b7';

const ownerExample: Owner_Dto = {
    user_id: userId,
    name: 'Jeff Bezos',
    email: 'jeffbezos@amazon.com',
    street: '1234 Amazon Street',
    city: 'Seattle',
    zip: '98101',
}

const lodgerExample: Lodger_Post = {
    name: 'Marc Simonsini',
    email: 'marcsimonsini@meetic.fr'
}

const estateExample: Estate_Dto = {
    street: '1234 Estate Street',
    city: 'Seattle',
    zip: '98101',
    rent: '0',
    charges: '0'
}


export const rentsBuisnessTests = (getEstateService, getOwnerService, getLodgerService) => {

    let estate;
    let owner;
    let lodger;

    it('create estate, owner and lodger for rent receipt', async () => {

        const estateService = getEstateService() as EstatesService;
        const ownerService = getOwnerService() as OwnersService;
        const lodgerService = getLodgerService() as LodgersService;

        const formatedOwner = formatOwnerDtoToOwnerDb(ownerExample, userId);
        owner = await lastValueFrom(ownerService.create(formatedOwner));

        const formatedLodger = formatLodgerPost(lodgerExample, userId);
        lodger = await lastValueFrom(lodgerService.create(formatedLodger));

        estateExample.owner_id = owner.id;
        estateExample.lodger_id = lodger.id;
        const formatedEstate = formatEstateDtoToEstateDb(estateExample, userId );
        estate = await lastValueFrom(estateService.create(formatedEstate))

        expect(estate).toBeDefined();

    });

}