import { Estate_Db } from './estate-db.model';
import { Estate_Dto } from './estate-dto.model';

export const formatEstateDtoToEstateDb = (estateDto: Estate_Dto, userId: string): Estate_Db => {
    return {
        id:estateDto.id,
        street: estateDto.street,
        city: estateDto.city,
        zip: estateDto.zip,
        plot: estateDto.plot?estateDto.plot:'',
        user_id: userId,
        rent: estateDto.rent?parseFloat(estateDto.rent):0,
        charges: estateDto.charges?parseFloat(estateDto.charges):0,
        owner_id: estateDto.owner?parseInt(estateDto.owner):0,
        lodger_id: estateDto.lodger?parseInt(estateDto.lodger):0,
    }
}