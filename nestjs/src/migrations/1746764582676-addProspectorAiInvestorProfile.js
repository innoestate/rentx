"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddProspectorAiInvestorProfile1746764582676 = void 0;
class AddProspectorAiInvestorProfile1746764582676 {
    constructor() {
        this.name = 'AddProspectorAiInvestorProfile1746764582676';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "prospector_ai_investor_profile" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" character varying NOT NULL, "field" character varying NOT NULL, "value" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9315f5bf8dcfd6bd2e266c66885" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "google_refresh_token"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refresh_token"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "refresh_token" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "google_refresh_token" character varying(512)`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "google_refresh_token"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refresh_token"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "refresh_token" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "google_refresh_token" character varying(512)`);
        await queryRunner.query(`DROP TABLE "prospector_ai_investor_profile"`);
    }
}
exports.AddProspectorAiInvestorProfile1746764582676 = AddProspectorAiInvestorProfile1746764582676;
//# sourceMappingURL=1746764582676-addProspectorAiInvestorProfile.js.map