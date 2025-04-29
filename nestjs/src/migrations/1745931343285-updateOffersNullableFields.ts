import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateOffersNullableFields1745931343285 implements MigrationInterface {
    name = 'UpdateOffersNullableFields1745931343285'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "google_refresh_token"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refresh_token"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "refresh_token" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "google_refresh_token" character varying(512)`);
        await queryRunner.query(`ALTER TABLE "offers" ALTER COLUMN "price" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "offers" ALTER COLUMN "markdown" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "offers" ALTER COLUMN "google_drive_id" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "offers" ALTER COLUMN "google_drive_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "offers" ALTER COLUMN "markdown" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "offers" ALTER COLUMN "price" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "google_refresh_token"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refresh_token"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "refresh_token" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "google_refresh_token" character varying(512)`);
    }

}
