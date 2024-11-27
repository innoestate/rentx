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

export const fromatEstateForPatch = ( data: any) => {
    let patchData: Partial<Estate_Db> = {
        id: data.id
    };
    if(data.plot && typeof data.plot === 'string') {
        patchData = {...patchData, plot: data.plot};
    }
    if(data.rent) {
        let rent = asNumber(data.rent);
        if(rent !== null){
            patchData = {...patchData, rent: rent};
        }
    }
    if(data.charges) {
        let charges = asNumber(data.charges);
        if(charges !== null){
            patchData = {...patchData, charges: charges};
        }
    }
    if(data.owner_id && typeof data.owner_id === 'string') {
        patchData = {...patchData, owner_id: data.owner_id};
    }
    if(data.lodger_id && typeof data.lodger_id === 'string') {
        patchData = {...patchData, lodger_id: data.lodger_id};
    }
    return patchData;
}
let asNumber = (value: any) => {
    if(typeof value === 'number') {
        return value;
    }
    try {
        return parseFloat(value);
    }catch(e) {
        return null;
    }
}