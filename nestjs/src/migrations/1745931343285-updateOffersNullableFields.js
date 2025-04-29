"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOffersNullableFields1745931343285 = void 0;
class UpdateOffersNullableFields1745931343285 {
    constructor() {
        this.name = 'UpdateOffersNullableFields1745931343285';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "google_refresh_token"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refresh_token"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "refresh_token" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "google_refresh_token" character varying(512)`);
        await queryRunner.query(`ALTER TABLE "offers" ALTER COLUMN "price" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "offers" ALTER COLUMN "markdown" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "offers" ALTER COLUMN "google_drive_id" DROP NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "offers" ALTER COLUMN "google_drive_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "offers" ALTER COLUMN "markdown" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "offers" ALTER COLUMN "price" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "google_refresh_token"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refresh_token"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "refresh_token" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "google_refresh_token" character varying(512)`);
    }
}
exports.UpdateOffersNullableFields1745931343285 = UpdateOffersNullableFields1745931343285;
//# sourceMappingURL=1745931343285-updateOffersNullableFields.js.map