"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddOfferGoogleDriveId1737263764235 = void 0;
class AddOfferGoogleDriveId1737263764235 {
    constructor() {
        this.name = 'AddOfferGoogleDriveId1737263764235';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "offers" ADD "google_drive_id" character varying NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "offers" DROP COLUMN "google_drive_id"`);
    }
}
exports.AddOfferGoogleDriveId1737263764235 = AddOfferGoogleDriveId1737263764235;
//# sourceMappingURL=1737263764235-addOfferGoogleDriveId.js.map