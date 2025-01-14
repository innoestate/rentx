import { synchronizeFoldersStorage } from "../storage.business";
import { FolderStorageStrategy } from "../strategy/folder-storage.strategy";
import { prospections1_Without_Adress } from "./storage.mocks";

describe('testing storage folders', () => {

    const strategy = new FolderStorageStrategy();

    it('should create a folder', async () => {

        let id = '';
        let path = '';

        await synchronizeFoldersStorage([prospections1_Without_Adress], strategy);

        expect(strategy.getFolder(id)?.path).toEqual(path);

    })

})