import { Estate_filled_Db } from '../../../estates/estate-filled-db.model';
import { SpreadSheet } from '../../../spreadsheets/models/spreadsheets.model';
import { getMissingRows, getUnusedEstates } from '../spreadsheets.utils';

const estate: Estate_filled_Db = {
    id: '0',
    user_id: '1',
    owner: {
        id: '1',
        user_id: '1',
        name: 'Elon Musk',
        street: '1 rue de lespace',
        city: 'Paris',
        zip: 'Z7',
        signature: '1234',
        email: '1234',
        phone: '1234',
    },
    lodger: {
        id: '2',
        user_id: '1',
        email: '1234',
        name: 'Jeff Bezos',
        created_at: new Date('2024-02-01'),
        updated_at: new Date('2024-02-29'),
    },
    street: '1 rue de lespace',
    city: 'Paris',
    zip: 'Z7',
}

describe('testing removing unusedEstates', () => {


    it('should return no unusedEstates', async () => {

        const spreadSheet: SpreadSheet = {
            id: '',
            title: 'test',
            sheets: []
        }
        const estates = [];
        const unusedEstates = getUnusedEstates(spreadSheet, estates);
        expect(unusedEstates.length).toEqual(0);

    });

    it('should return no unusedEstates', async () => {

        const spreadSheet: SpreadSheet = {
            id: '',
            title: 'test',
            sheets: []
        }
        const unusedEstates = getUnusedEstates(spreadSheet, [estate]);
        expect(unusedEstates.length).toEqual(0);

    });

    it('should return 1 unusedEstates', async () => {

        const spreadSheet: SpreadSheet = {
            id: '',
            title: 'test',
            sheets: [{
                sheetId: 0,
                title: '2024',
                rows: [[{ value: 'Propriétaire' }, { value: 'Adresse' }, { value: 'Ville' }, { value: 'Lot' }],
                [{ value: 'Jean Marc' }, { value: '1 rue machin' }, { value: 'Paris' }, { value: '1' }]]
            }]
        }
        const unusedEstates = getUnusedEstates(spreadSheet, [estate]);
        expect(unusedEstates.length).toEqual(1);

    });

    it('should return 0 unusedEstates', async () => {

        const spreadSheet: SpreadSheet = {
            id: '',
            title: 'test',
            sheets: [{
                sheetId: 0,
                title: '2024',
                rows: [[{ value: 'Propriétaire' }, { value: 'Adresse' }, { value: 'Ville' }, { value: 'Lot' }],
                [{ value: 'Jean Marc' }, { value: '1 rue de lespace' }, { value: 'Paris' }, { value: '' }]]

            }]
        }
        const unusedEstates = getUnusedEstates(spreadSheet, [estate]);
        expect(unusedEstates.length).toEqual(0);

    });

    it('should return no missingRows', async () => {

        const spreadSheet: SpreadSheet = {
            id: '',
            title: 'test',
            sheets: []
        }
        const estates = [];
        const missingEstates = getMissingRows(spreadSheet, estates);
        expect(missingEstates.length).toEqual(0);

    });

    it('should return 0 missingRows', async () => {

        const spreadSheet: SpreadSheet = {
            id: '',
            title: 'test',
            sheets: [{
                sheetId: 0,
                title: '2024',
                rows: [[{ value: 'Propriétaire' }, { value: 'Adresse' }, { value: 'Ville' }, { value: 'Lot' }],
                [{ value: 'Jean Marc' }, { value: '1 rue de lespace' }, { value: 'Paris' }, { value: '' }]]
            }]
        }
        const estates = [estate];
        const missingEstates = getMissingRows(spreadSheet, estates);
        expect(missingEstates[0].missingEstates.length).toEqual(0);

    });

    it('should return 1 missingRows', async () => {

        const spreadSheet: SpreadSheet = {
            id: '',
            title: 'test',
            sheets: [{
                sheetId: 0,
                title: '2024',
                rows: [[{ value: 'Propriétaire' }, { value: 'Adresse' }, { value: 'Ville' }, { value: 'Lot' }],
                [{ value: 'Jean Marc' }, { value: '1 rue hello world' }, { value: 'Los Angeles' }, { value: 'A1' }]]
            }]
        }
        const estates = [estate];
        const missingEstates = getMissingRows(spreadSheet, estates);
        expect(missingEstates[0].missingEstates.length).toEqual(1);

    });

});