"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetUserIdInOffers1737266888572 = void 0;
class SetUserIdInOffers1737266888572 {
    constructor() {
        this.name = 'SetUserIdInOffers1737266888572';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "offers" DROP COLUMN "google_drive_id"`);
        await queryRunner.query(`ALTER TABLE "offers" ADD "user_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "offers" ADD "google_drive_id" character varying NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "offers" DROP COLUMN "google_drive_id"`);
        await queryRunner.query(`ALTER TABLE "offers" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "offers" ADD "google_drive_id" character varying NOT NULL`);
    }
}
exports.SetUserIdInOffers1737266888572 = SetUserIdInOffers1737266888572;
//# sourceMappingURL=1737266888572-setUserIdInOffers.js.map