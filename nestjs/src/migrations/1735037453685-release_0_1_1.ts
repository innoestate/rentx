import { MigrationInterface, QueryRunner } from "typeorm";

export class Release0111735037453685 implements MigrationInterface {
    name = 'Release0111735037453685'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rents" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "estate_id" uuid NOT NULL, "lodger_id" uuid NOT NULL, "start_date" date NOT NULL, "end_date" date NOT NULL, "rent" integer NOT NULL, "charges" integer NOT NULL, "sent" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_43a9961f1448a8d75f9b25156ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_f1bdd408f7900b431b68ebf94e" ON "rents" ("user_id", "estate_id", "lodger_id", "start_date", "end_date") `);
        await queryRunner.query(`CREATE TABLE "docs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "rents_google_sheet_id" character varying NOT NULL, CONSTRAINT "PK_3a13e0daf5db0055b25d829f2f2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_7bd4d5e18d4af496ad3c77e618" ON "docs" ("user_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_7bd4d5e18d4af496ad3c77e618"`);
        await queryRunner.query(`DROP TABLE "docs"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f1bdd408f7900b431b68ebf94e"`);
        await queryRunner.query(`DROP TABLE "rents"`);
    }

}
