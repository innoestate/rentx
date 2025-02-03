import { MigrationInterface, QueryRunner } from "typeorm";

export class AddZipInProspectionAndZipAndCityInSeller1737480017659 implements MigrationInterface {
    name = 'AddZipInProspectionAndZipAndCityInSeller1737480017659'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sellers" ADD "zip" character varying`);
        await queryRunner.query(`ALTER TABLE "sellers" ADD "city" character varying`);
        await queryRunner.query(`ALTER TABLE "prospections" ADD "zip" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "prospections" DROP COLUMN "zip"`);
        await queryRunner.query(`ALTER TABLE "sellers" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "sellers" DROP COLUMN "zip"`);
    }

}
