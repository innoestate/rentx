"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixUserRefreshToken1740029836990 = void 0;
class FixUserRefreshToken1740029836990 {
    constructor() {
        this.name = 'FixUserRefreshToken1740029836990';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "refresh_token" TO "google_refresh_token"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "google_refresh_token"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "refresh_token" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "google_refresh_token" character varying(512)`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "google_refresh_token"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refresh_token"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "google_refresh_token" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "google_refresh_token" TO "refresh_token"`);
    }
}
exports.FixUserRefreshToken1740029836990 = FixUserRefreshToken1740029836990;
//# sourceMappingURL=1740029836990-fixUserRefreshToken.js.map