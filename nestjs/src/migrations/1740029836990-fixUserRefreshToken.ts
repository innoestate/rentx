import { MigrationInterface, QueryRunner } from "typeorm";

export class FixUserRefreshToken1740029836990 implements MigrationInterface {
    name = 'FixUserRefreshToken1740029836990'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "refresh_token" TO "google_refresh_token"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "google_refresh_token"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "refresh_token" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "google_refresh_token" character varying(512)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "google_refresh_token"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refresh_token"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "google_refresh_token" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "google_refresh_token" TO "refresh_token"`);
    }

}
