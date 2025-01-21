import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProspectionStorageFolderId1736875450171 implements MigrationInterface {
    name = 'AddProspectionStorageFolderId1736875450171'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "prospections" ADD "storage_folder_id" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "prospections" DROP COLUMN "storage_folder_id"`);
    }

}
