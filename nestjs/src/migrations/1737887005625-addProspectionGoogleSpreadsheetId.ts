import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProspectionGoogleSpreadsheetId1737887005625 implements MigrationInterface {
    name = 'AddProspectionGoogleSpreadsheetId1737887005625'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "docs" ADD "prospections_google_sheet_id" character varying`);
        await queryRunner.query(`ALTER TABLE "docs" ALTER COLUMN "rents_google_sheet_id" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "docs" ALTER COLUMN "rents_google_sheet_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "docs" DROP COLUMN "prospections_google_sheet_id"`);
    }

}
