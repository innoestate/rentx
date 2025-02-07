import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAlphaUsers1738960882626 implements MigrationInterface {
    name = 'AddAlphaUsers1738960882626'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "alpha_users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_c934eeeac402244591064787c48" UNIQUE ("email"), CONSTRAINT "PK_bc63c9d17a4c058d7c81989922a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "alpha_users"`);
    }

}
