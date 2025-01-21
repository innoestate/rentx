import { MigrationInterface, QueryRunner } from "typeorm";

export class SetUserIdInOffers1737266888572 implements MigrationInterface {
    name = 'SetUserIdInOffers1737266888572'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "offers" DROP COLUMN "google_drive_id"`);
        await queryRunner.query(`ALTER TABLE "offers" ADD "user_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "offers" ADD "google_drive_id" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "offers" DROP COLUMN "google_drive_id"`);
        await queryRunner.query(`ALTER TABLE "offers" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "offers" ADD "google_drive_id" character varying NOT NULL`);
    }

}
