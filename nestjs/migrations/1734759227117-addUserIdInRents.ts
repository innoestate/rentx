import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserIdInRents1734759227117 implements MigrationInterface {
    name = 'AddUserIdInRents1734759227117'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_0c22efc342731524622af376f0"`);
        await queryRunner.query(`ALTER TABLE "rents" ADD "user_id" uuid NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_f1bdd408f7900b431b68ebf94e" ON "rents" ("user_id", "estate_id", "lodger_id", "start_date", "end_date") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_f1bdd408f7900b431b68ebf94e"`);
        await queryRunner.query(`ALTER TABLE "rents" DROP COLUMN "user_id"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_0c22efc342731524622af376f0" ON "rents" ("estate_id", "lodger_id", "start_date", "end_date") `);
    }

}
