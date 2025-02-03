import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProspectionDelete1737437357005 implements MigrationInterface {
    name = 'UpdateProspectionDelete1737437357005'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "offers" DROP CONSTRAINT "FK_f529f1a5e8445fe4114cf341e79"`);
        await queryRunner.query(`ALTER TABLE "offers" ADD CONSTRAINT "FK_f529f1a5e8445fe4114cf341e79" FOREIGN KEY ("prospection_id") REFERENCES "prospections"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "offers" DROP CONSTRAINT "FK_f529f1a5e8445fe4114cf341e79"`);
        await queryRunner.query(`ALTER TABLE "offers" ADD CONSTRAINT "FK_f529f1a5e8445fe4114cf341e79" FOREIGN KEY ("prospection_id") REFERENCES "prospections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
