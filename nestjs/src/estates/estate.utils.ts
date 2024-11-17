import { Estate_Db } from './estate-db.model';
import { Estate_Dto } from './estate-dto.model';

export const formatEstateDtoToEstateDb = (estateDto: Estate_Dto, userId: string): Estate_Db => {
    const estateForDb: Estate_Db = {
        user_id: userId,
        street: estateDto.street,
        city: estateDto.city,
        zip: estateDto.zip,

        plot: estateDto.plot ?? '',
        owner_id: estateDto.owner_id ?? '',
        lodger_id: estateDto.lodger_id ?? '',
    }
    if (parseFloat(estateDto.rent)) {
        estateForDb.rent = parseFloat(estateDto.rent);
    } else {
        estateForDb.rent = 0;
    }
    if (parseFloat(estateDto.charges)) {
        estateForDb.charges = parseFloat(estateDto.charges);
    } else {
        estateForDb.charges = 0;
    }
    return estateForDb;
}