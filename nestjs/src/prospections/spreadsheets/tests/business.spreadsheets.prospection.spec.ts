import { PropertyStatusTranslation } from "../../../prospections/dto/prospection.dto";
import { MockedGoogleSpreadSheetStrategy } from "../../../spreadsheets/strategies/spreadsheets.mocked.strategy";
import { addProspectionsSpreadsheet, createProspectionsSpreadsheet, removeProspectionsSpreadsheet, updateProspectionsSpreadsheet, updateSellersSpreadsheet } from "../spreadsheets.prospection.business";
import { convertCellsToSuperficialProspection, formatProspections, getProspectionsInRowsThatAreNotInProspections, PROSPECTIONS_SHEETS_TITLES} from "../spreadsheets.prospection.utils";
import { ProspectionMocked1, ProspectionMocked2, ProspectionMocked3 } from "./mocks/prospections.mocked";
import { sellerMocked1, sellerMocked2, sellerMocked3 } from "./mocks/sellers.mocked";

describe('test spreadsheets prospections service', () => {
    
    const mockedSpreadSheetStrategy = new MockedGoogleSpreadSheetStrategy();
    const userId = '1234'
    let spreadSheetId: string;

    it('should create a spreadsheet with all the sheets', async () => {
        const spreadSheet = await createProspectionsSpreadsheet(mockedSpreadSheetStrategy, userId);
        spreadSheetId = spreadSheet.id;
        expect(spreadSheet.sheets.length).toBe(3);
        expect(spreadSheet.sheets[0].title).toBe(PROSPECTIONS_SHEETS_TITLES[0]);
        expect(spreadSheet.sheets[1].title).toBe(PROSPECTIONS_SHEETS_TITLES[1]);
        expect(spreadSheet.sheets[2].title).toBe(PROSPECTIONS_SHEETS_TITLES[2]);
        expect(spreadSheet.sheets[0].rows[0].find(cell => cell.value === 'lien')?.value).toBe('lien');
    })

    it('should update the spreadsheet with the new prospection', async () => {
        const spreadSheet = await addProspectionsSpreadsheet(mockedSpreadSheetStrategy, spreadSheetId, [{...ProspectionMocked1}], [{...sellerMocked1}]);
        expect(spreadSheet.sheets[0].rows.length).toBe(2);
        expect(spreadSheet.sheets[0].rows[1].find(cell => cell.value === ProspectionMocked1.address)?.value).toBeTruthy();
        expect(spreadSheet.sheets[1].rows[1].find(cell => cell.value === sellerMocked1.name)?.value).toBeTruthy();
        const statusIndex = spreadSheet.sheets[0].rows[0].findIndex(cell => cell.value === 'status');
        expect(spreadSheet.sheets[0].rows[1][statusIndex]?.value).toBe('Contacté');
        const emailIndex = spreadSheet.sheets[0].rows[0].findIndex(cell => cell.value === 'email');
        expect(spreadSheet.sheets[0].rows[1][emailIndex]?.value).toBe(sellerMocked1.email);
    })

    it('should add another prospection', async () => {
        const spreadSheet = await addProspectionsSpreadsheet(mockedSpreadSheetStrategy, spreadSheetId, [{...ProspectionMocked2}], [{...sellerMocked2}]);
        expect(spreadSheet.sheets[0].rows.length).toBe(3);
        expect(spreadSheet.sheets[0].rows[2].find(cell => cell.value === ProspectionMocked2.address)?.value).toBeTruthy();
        expect(spreadSheet.sheets[0].rows[2].find(cell => cell.value === sellerMocked2.phone)?.value).toBeTruthy();
        expect(spreadSheet.sheets[1].rows.length).toBe(3);
        expect(spreadSheet.sheets[1].rows[2].find(cell => cell.value === sellerMocked2.name)?.value).toBeTruthy();
    })

    it('should not add the prospection that already exists', async () => {
        const spreadSheet = await addProspectionsSpreadsheet(mockedSpreadSheetStrategy, spreadSheetId, [{...ProspectionMocked1}], [{...sellerMocked1}]);
        expect(spreadSheet.sheets[0].rows.length).toBe(3);
        expect(spreadSheet.sheets[1].rows.length).toBe(3);
    })

    it('should not add the prospection that already exists', async () => {
        const spreadSheet = await addProspectionsSpreadsheet(mockedSpreadSheetStrategy, spreadSheetId, [{...ProspectionMocked1}, {...ProspectionMocked2}], [{...sellerMocked1}, {...sellerMocked2}]);
        expect(spreadSheet.sheets[0].rows.length).toBe(3);
        expect(spreadSheet.sheets[1].rows.length).toBe(3);
    })

    it('should add only the prospection that not already exists', async () => {
        const spreadSheet = await addProspectionsSpreadsheet(mockedSpreadSheetStrategy, spreadSheetId, [{...ProspectionMocked1}, {...ProspectionMocked2}, {...ProspectionMocked3}], []);
        expect(spreadSheet.sheets[0].rows.length).toBe(4);
        expect(spreadSheet.sheets[0].rows[3].find(cell => cell.value === ProspectionMocked3.address)?.value).toBeTruthy();
    })

    it('should add sellers that not already exists', async () => {
        const spreadSheet = await addProspectionsSpreadsheet(mockedSpreadSheetStrategy, spreadSheetId, [{...ProspectionMocked1}, {...ProspectionMocked2}, {...ProspectionMocked3}], [{...sellerMocked1},{...sellerMocked2}, {...sellerMocked3}]);
        expect(spreadSheet.sheets[0].rows.length).toBe(4);
        expect(spreadSheet.sheets[0].rows[3].find(cell => cell.value === ProspectionMocked3.address)?.value).toBeTruthy();
        expect(spreadSheet.sheets[1].rows.length).toBe(4);
        expect(spreadSheet.sheets[1].rows[3].find(cell => cell.value === sellerMocked3.name)?.value).toBeTruthy();
    })

    it('should update a cell in a prospection', async () => {
        const prospectionBuilded = formatProspections([ProspectionMocked1], [sellerMocked1])[0];
        const spreadSheet = await updateProspectionsSpreadsheet(mockedSpreadSheetStrategy, spreadSheetId, [{...prospectionBuilded, address: 'new address'}]);
        expect(spreadSheet.sheets[0].rows[1].find(cell => cell.value === 'new address')?.value).toBeTruthy();
    })

    it('should update 2 cells in a prospection', async () => {
        const prospectionBuilded = formatProspections([{...ProspectionMocked1, address: 'new address 2', status: 'Pending'}], [sellerMocked1])[0];
        const spreadSheet = await updateProspectionsSpreadsheet(mockedSpreadSheetStrategy, spreadSheetId, [prospectionBuilded]);
        expect(spreadSheet.sheets[0].rows[1].find(cell => cell.value === 'new address 2')?.value).toBeTruthy();
        expect(spreadSheet.sheets[0].rows[1].find(cell => cell.value === PropertyStatusTranslation['Pending'])?.value).toBeTruthy();
    })

    it('should update 2 and 1 cells in 2 prospections', async () => {
        const prospectionBuilded = formatProspections([{...ProspectionMocked1, address: 'new address 1', status: 'Accepted'}], [sellerMocked1])[0];
        const prospectionBuilded2 = formatProspections([{...ProspectionMocked2, address: 'address modified', status: 'Accepted'}], [sellerMocked2])[0];
        const spreadSheet = await updateProspectionsSpreadsheet(mockedSpreadSheetStrategy, spreadSheetId, [prospectionBuilded, prospectionBuilded2]);
        expect(spreadSheet.sheets[0].rows[1].find(cell => cell.value === 'new address 1')?.value).toBeTruthy();
        expect(spreadSheet.sheets[0].rows[1].find(cell => cell.value === PropertyStatusTranslation['Accepted'])?.value).toBeTruthy();
        expect(spreadSheet.sheets[0].rows[2].find(cell => cell.value === 'address modified')?.value).toBeTruthy();
    })

    it('should remove a prospection and add it in archives', async () => {
        const spreadSheet = await removeProspectionsSpreadsheet(mockedSpreadSheetStrategy, spreadSheetId, [{...ProspectionMocked1}]);
        expect(spreadSheet.sheets[0].rows.length).toBe(3);
        expect(spreadSheet.sheets[2].rows.length).toBe(2);
    })

    it('should not remove a prospection that already has been removed', async () => {
        const spreadSheet = await removeProspectionsSpreadsheet(mockedSpreadSheetStrategy, spreadSheetId, [{...ProspectionMocked1}]);
        expect(spreadSheet.sheets[0].rows.length).toBe(3);
        expect(spreadSheet.sheets[2].rows.length).toBe(2);
    })

    it('should update a seller', async () => {
        const spreadSheet = await updateSellersSpreadsheet(mockedSpreadSheetStrategy, spreadSheetId, [{...sellerMocked1, address: 'new address'}]);
        expect(spreadSheet.sheets[1].rows[1].find(cell => cell.value === 'new address')?.value).toBeTruthy();
    })

    it('should update 2 row in 2 sellers', async () => {
        const spreadSheet = await updateSellersSpreadsheet(mockedSpreadSheetStrategy, spreadSheetId, [{...sellerMocked1, address: 'address modified', email: 'newEmail@test.com'}, {...sellerMocked2, address: 'new address 2', email: 'newEmail2@test.com'}]);
        expect(spreadSheet.sheets[1].rows[1].find(cell => cell.value === 'address modified')?.value).toBeTruthy();
        expect(spreadSheet.sheets[1].rows[1].find(cell => cell.value === 'newEmail@test.com')?.value).toBeTruthy();
        expect(spreadSheet.sheets[1].rows[2].find(cell => cell.value === 'new address 2')?.value).toBeTruthy();
        expect(spreadSheet.sheets[1].rows[2].find(cell => cell.value === 'newEmail2@test.com')?.value).toBeTruthy();
    })

    it('should convert cells to prospections', async () => {
        let spreadSheet = await createProspectionsSpreadsheet(mockedSpreadSheetStrategy, userId);
        spreadSheet = await addProspectionsSpreadsheet(mockedSpreadSheetStrategy, spreadSheetId, [{...ProspectionMocked1}], []);
        const prospection = convertCellsToSuperficialProspection(spreadSheet.sheets[0].rows[1]); 
        expect(prospection?.link).toBe(ProspectionMocked1.link);
    })

    it('should return the prospection that have to be removed', async () => {
        let spreadSheet = await createProspectionsSpreadsheet(mockedSpreadSheetStrategy, userId);
        spreadSheet = await addProspectionsSpreadsheet(mockedSpreadSheetStrategy, spreadSheetId, [{...ProspectionMocked1}], []);
        const prospectionsToRemove = getProspectionsInRowsThatAreNotInProspections(spreadSheet, []);
        expect(prospectionsToRemove.length).toBe(1);
        expect(prospectionsToRemove[0].link).toBe(ProspectionMocked1.link);
    })

})  