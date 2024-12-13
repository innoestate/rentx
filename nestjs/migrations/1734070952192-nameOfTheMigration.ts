import { MigrationInterface, QueryRunner } from "typeorm";

export class NameOfTheMigration1734070952192 implements MigrationInterface {
    name = 'NameOfTheMigration1734070952192'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "docs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "rents_google_sheet_id" character varying NOT NULL, CONSTRAINT "PK_3a13e0daf5db0055b25d829f2f2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_7bd4d5e18d4af496ad3c77e618" ON "docs" ("user_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_7bd4d5e18d4af496ad3c77e618"`);
        await queryRunner.query(`DROP TABLE "docs"`);
    }

}
