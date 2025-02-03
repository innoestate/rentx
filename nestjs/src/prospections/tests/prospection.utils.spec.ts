import { formatProspectionDtoForCreation } from "../prospections.utils";

describe('prospection utils', () => {

    it('should return the correct ProspectionDto with only an adress', () => {

        const prospectionDto = {
            city: 'Los Angeles',
        };
        const formatedProspection = formatProspectionDtoForCreation('1234', prospectionDto);
        expect(formatedProspection.city).toEqual('Los Angeles');
        expect(formatedProspection.user_id).toEqual('1234');
        expect(formatedProspection.emission_date).toBeDefined();
        expect(formatedProspection.price).toEqual(0);
        expect(formatedProspection.address).toBeDefined();
        expect(formatedProspection.link).toBeDefined();

    });


    
});