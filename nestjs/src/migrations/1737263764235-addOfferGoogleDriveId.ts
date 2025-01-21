import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOfferGoogleDriveId1737263764235 implements MigrationInterface {
    name = 'AddOfferGoogleDriveId1737263764235'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "offers" ADD "google_drive_id" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "offers" DROP COLUMN "google_drive_id"`);
    }

}
