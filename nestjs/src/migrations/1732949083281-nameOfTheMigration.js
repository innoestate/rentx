"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NameOfTheMigration1732949083281 = void 0;
class NameOfTheMigration1732949083281 {
    constructor() {
        this.name = 'NameOfTheMigration1732949083281';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "owners" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "name" character varying(100) NOT NULL, "street" character varying(100) NOT NULL, "city" character varying(100) NOT NULL, "zip" character varying(100) NOT NULL, "signature" text NOT NULL, "email" character varying(100) NOT NULL, "phone" character varying(100) NOT NULL, CONSTRAINT "PK_42838282f2e6b216301a70b02d6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_150c790b3186377091fd0073de" ON "owners" ("user_id", "name", "street", "city", "zip") `);
        await queryRunner.query(`CREATE TABLE "estates" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "owner_id" character varying NOT NULL, "lodger_id" character varying NOT NULL, "street" character varying NOT NULL, "city" character varying NOT NULL, "zip" character varying NOT NULL, "plot" character varying NOT NULL, "rent" integer NOT NULL, "charges" integer NOT NULL, CONSTRAINT "PK_e6e88990dece2b27b551fe6c7b2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_a4bba3f55354b7a5d06129adef" ON "estates" ("user_id", "street", "city", "zip", "plot") `);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "refresh_token" character varying(100), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lodgers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_606630310cc0120014526bbe88e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_206a213873c19af853eb6cd017" ON "lodgers" ("user_id", "name") `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_206a213873c19af853eb6cd017"`);
        await queryRunner.query(`DROP TABLE "lodgers"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a4bba3f55354b7a5d06129adef"`);
        await queryRunner.query(`DROP TABLE "estates"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_150c790b3186377091fd0073de"`);
        await queryRunner.query(`DROP TABLE "owners"`);
    }
}
exports.NameOfTheMigration1732949083281 = NameOfTheMigration1732949083281;
//# sourceMappingURL=1732949083281-nameOfTheMigration.js.map