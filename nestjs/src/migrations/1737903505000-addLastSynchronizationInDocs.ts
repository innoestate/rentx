import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLastSynchronizationInDocs1737903505000 implements MigrationInterface {
    name = 'AddLastSynchronizationInDocs1737903505000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "docs" ADD "lastSynchronization" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "docs" DROP COLUMN "lastSynchronization"`);
    }

}
