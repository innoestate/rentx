"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddProspectionStorageFolderId1736875450171 = void 0;
class AddProspectionStorageFolderId1736875450171 {
    constructor() {
        this.name = 'AddProspectionStorageFolderId1736875450171';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "prospections" ADD "storage_folder_id" character varying`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "prospections" DROP COLUMN "storage_folder_id"`);
    }
}
exports.AddProspectionStorageFolderId1736875450171 = AddProspectionStorageFolderId1736875450171;
//# sourceMappingURL=1736875450171-addProspectionStorageFolderId.js.map