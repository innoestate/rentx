import { MigrationInterface, QueryRunner } from "typeorm";

export class SetNullableFiedsInOwner1740030697662 implements MigrationInterface {
    name = 'SetNullableFiedsInOwner1740030697662'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "google_refresh_token"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refresh_token"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "refresh_token" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "google_refresh_token" character varying(512)`);
        await queryRunner.query(`DROP INDEX "public"."IDX_150c790b3186377091fd0073de"`);
        await queryRunner.query(`ALTER TABLE "owners" ALTER COLUMN "street" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "owners" ALTER COLUMN "city" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "owners" ALTER COLUMN "zip" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "owners" ALTER COLUMN "signature" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "owners" ALTER COLUMN "email" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "owners" ALTER COLUMN "phone" DROP NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_150c790b3186377091fd0073de" ON "owners" ("user_id", "name", "street", "city", "zip") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_150c790b3186377091fd0073de"`);
        await queryRunner.query(`ALTER TABLE "owners" ALTER COLUMN "phone" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "owners" ALTER COLUMN "email" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "owners" ALTER COLUMN "signature" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "owners" ALTER COLUMN "zip" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "owners" ALTER COLUMN "city" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "owners" ALTER COLUMN "street" SET NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_150c790b3186377091fd0073de" ON "owners" ("user_id", "name", "street", "city", "zip") `);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "google_refresh_token"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refresh_token"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "refresh_token" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "google_refresh_token" character varying(512)`);
    }

}
