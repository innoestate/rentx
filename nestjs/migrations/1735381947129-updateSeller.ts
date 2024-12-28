import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSeller1735381947129 implements MigrationInterface {
    name = 'UpdateSeller1735381947129'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sellers" ADD "address" character varying`);
        await queryRunner.query(`ALTER TABLE "sellers" ADD "agency" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sellers" DROP COLUMN "agency"`);
        await queryRunner.query(`ALTER TABLE "sellers" DROP COLUMN "address"`);
    }

}
