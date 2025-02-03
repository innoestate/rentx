"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddProspectionGoogleSpreadsheetId1737887005625 = void 0;
class AddProspectionGoogleSpreadsheetId1737887005625 {
    constructor() {
        this.name = 'AddProspectionGoogleSpreadsheetId1737887005625';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "docs" ADD "prospections_google_sheet_id" character varying`);
        await queryRunner.query(`ALTER TABLE "docs" ALTER COLUMN "rents_google_sheet_id" DROP NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "docs" ALTER COLUMN "rents_google_sheet_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "docs" DROP COLUMN "prospections_google_sheet_id"`);
    }
}
exports.AddProspectionGoogleSpreadsheetId1737887005625 = AddProspectionGoogleSpreadsheetId1737887005625;
//# sourceMappingURL=1737887005625-addProspectionGoogleSpreadsheetId.js.map