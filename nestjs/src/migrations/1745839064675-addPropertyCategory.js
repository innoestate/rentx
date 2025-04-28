"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddPropertyCategory1745839064675 = void 0;
class AddPropertyCategory1745839064675 {
    constructor() {
        this.name = 'AddPropertyCategory1745839064675';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "google_refresh_token"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refresh_token"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "refresh_token" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "google_refresh_token" character varying(512)`);
        await queryRunner.query(`ALTER TABLE "estates" ADD "property_category" character varying`);
        await queryRunner.query(`ALTER TABLE "prospections" ADD "property_category" character varying`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "prospections" DROP COLUMN "property_category"`);
        await queryRunner.query(`ALTER TABLE "estates" DROP COLUMN "property_category"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "google_refresh_token"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refresh_token"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "refresh_token" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "google_refresh_token" character varying(512)`);
    }
}
exports.AddPropertyCategory1745839064675 = AddPropertyCategory1745839064675;
//# sourceMappingURL=1745839064675-addPropertyCategory.js.map