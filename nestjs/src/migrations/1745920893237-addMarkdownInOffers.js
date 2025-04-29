"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddMarkdownInOffers1745920893237 = void 0;
class AddMarkdownInOffers1745920893237 {
    constructor() {
        this.name = 'AddMarkdownInOffers1745920893237';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "google_refresh_token"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refresh_token"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "refresh_token" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "google_refresh_token" character varying(512)`);
        await queryRunner.query(`ALTER TABLE "offers" ADD "markdown" text NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "offers" DROP COLUMN "markdown"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "google_refresh_token"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refresh_token"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "refresh_token" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "google_refresh_token" character varying(512)`);
    }
}
exports.AddMarkdownInOffers1745920893237 = AddMarkdownInOffers1745920893237;
//# sourceMappingURL=1745920893237-addMarkdownInOffers.js.map