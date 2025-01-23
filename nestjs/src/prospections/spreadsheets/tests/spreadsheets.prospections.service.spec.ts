import { MockedGoogleSpreadSheetStrategy } from "../../../spreadsheets/strategies/spreadsheets.mocked.strategy";
import { addProspectionsSpreadsheet, createProspectionsSpreadsheet, PROSPECTIONS_SHEETS_TITLES } from "../spreadsheets.prospection.utils";
import { ProspectionMocked1, ProspectionMocked2, ProspectionMocked3 } from "./prospections.mocked";
import { sellerMocked1, sellerMocked2, sellerMocked3 } from "./sellers.mocked";

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
    })

    it('should add another prospection', async () => {
        const spreadSheet = await addProspectionsSpreadsheet(mockedSpreadSheetStrategy, spreadSheetId, [{...ProspectionMocked2}], [{...sellerMocked2}]);
        expect(spreadSheet.sheets[0].rows.length).toBe(3);
        expect(spreadSheet.sheets[0].rows[2].find(cell => cell.value === ProspectionMocked2.address)?.value).toBeTruthy();
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

    it('should add ', async () => {
        const spreadSheet = await addProspectionsSpreadsheet(mockedSpreadSheetStrategy, spreadSheetId, [{...ProspectionMocked1}, {...ProspectionMocked2}, {...ProspectionMocked3}], [{...sellerMocked1},{...sellerMocked2}, {...sellerMocked3}]);
        expect(spreadSheet.sheets[0].rows.length).toBe(4);
        expect(spreadSheet.sheets[0].rows[3].find(cell => cell.value === ProspectionMocked3.address)?.value).toBeTruthy();
        expect(spreadSheet.sheets[1].rows.length).toBe(4);
        expect(spreadSheet.sheets[1].rows[3].find(cell => cell.value === sellerMocked3.name)?.value).toBeTruthy();
    })

})  