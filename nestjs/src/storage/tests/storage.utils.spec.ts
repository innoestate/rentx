import { getProspectionFolderPath } from "../utils/storage.utils";
import { prospections1_Without_Adress, prospections2_With_Adress } from "./storage.mocks";

describe('testing storage utils', () => {

    it('should create a path from city and price', async () => {

        const path = getProspectionFolderPath(prospections1_Without_Adress);
        expect(path).toEqual('ville-forte_100000');

    })

    it('should create a path from city and price', async () => {
        const path = getProspectionFolderPath(prospections2_With_Adress);
        expect(path).toEqual('123 rue du test 12345 ville-forte');
    })

})