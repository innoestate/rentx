import { MockedGoogleSpreadSheetStrategy } from "../../../../spreadsheets/strategies/spreadsheets.mocked.strategy";
import { synchronizeProspections } from "../../business/spreadsheets.prospection.business";
import { ProspectionMocked1, ProspectionMocked2 } from "./prospections.mocked";
import { sellerMocked1, sellerMocked2 } from "./sellers.mocked";
import { SpreadSheet } from "../../../../spreadsheets/models/spreadsheets.model";

describe('test spreadsheets synchronization business', () => {

    let spreadSheet!: SpreadSheet;

    it('should return a spreadsheet with an id', async () => {

        const spreadSheetStrategy = new MockedGoogleSpreadSheetStrategy();
        spreadSheet = await synchronizeProspections(spreadSheetStrategy, [], []);
        expect(spreadSheet?.id).toBeDefined();
        expect(spreadSheet?.sheets?.length).toBe(3);

    })

    it('should return a spreadsheet with the existing id', async () => {

        const spreadSheetStrategy = new MockedGoogleSpreadSheetStrategy();
        spreadSheet = await synchronizeProspections(spreadSheetStrategy, [], []);
        expect(spreadSheet?.id).toEqual(spreadSheet.id);
        expect(spreadSheet?.sheets?.length).toBe(3);

    })

    it('should return a spreadsheet with 1 prospection and one seller', async () => {

        const spreadSheetStrategy = new MockedGoogleSpreadSheetStrategy();
        const prospections = [{ ...ProspectionMocked1 }];
        const sellers = [{ ...sellerMocked1 }];

        const spreadSheet = await synchronizeProspections(spreadSheetStrategy, prospections, sellers);

        expect(spreadSheet?.id).toBeDefined();
        expect(spreadSheet?.sheets[0].rows.length).toBe(2);
        expect(spreadSheet?.sheets[1].rows.length).toBe(2);

    })

    it('should return a spreadsheet with the same number of prospections and sellers without doublons', async () => {

        const spreadSheetStrategy = new MockedGoogleSpreadSheetStrategy();
        let spreadSheet = await synchronizeProspections(spreadSheetStrategy, [{ ...ProspectionMocked1 }], [{ ...sellerMocked1 }]);
        spreadSheet = await synchronizeProspections(spreadSheetStrategy, [{ ...ProspectionMocked1 }], [{ ...sellerMocked1 }]);
        expect(spreadSheet?.id).toBeDefined();
        expect(spreadSheet?.sheets[0].rows.length).toBe(2);
        expect(spreadSheet?.sheets[1].rows.length).toBe(2);

    })

    it('should return a spreadsheet with more prospections and sellers', async () => {

        const spreadSheetStrategy = new MockedGoogleSpreadSheetStrategy();
        const prospections = [{ ...ProspectionMocked1 }, { ...ProspectionMocked2 }];
        const sellers = [{ ...sellerMocked1 }, { ...sellerMocked2 }];
        const spreadSheet = await synchronizeProspections(spreadSheetStrategy, prospections, sellers);
        expect(spreadSheet?.id).toBeDefined();
        expect(spreadSheet?.sheets[0].rows.length).toBe(3);
        expect(spreadSheet?.sheets[1].rows.length).toBe(3);

    })

    it('should return a spreadsheet with an archived prospection', async () => {

        const spreadSheetStrategy = new MockedGoogleSpreadSheetStrategy();

        let spreadSheet = await synchronizeProspections(spreadSheetStrategy, [{ ...ProspectionMocked1 }, { ...ProspectionMocked2 }], [{ ...sellerMocked1 }, { ...sellerMocked2 }]);
        spreadSheet = await synchronizeProspections(spreadSheetStrategy, [{ ...ProspectionMocked2 }], [{ ...sellerMocked1 }, { ...sellerMocked2 }], spreadSheet.id);
        expect(spreadSheet?.id).toBeDefined();
        expect(spreadSheet?.sheets[0].rows.length).toBe(2);
        expect(spreadSheet?.sheets[1].rows.length).toBe(3);
        expect(spreadSheet?.sheets[2].rows.length).toBe(2);

    })

})