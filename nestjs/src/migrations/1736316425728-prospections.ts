import { MigrationInterface, QueryRunner } from "typeorm";

export class Prospections1736316425728 implements MigrationInterface {
    name = 'Prospections1736316425728'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sellers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "name" character varying NOT NULL, "phone" character varying NOT NULL, "email" character varying NOT NULL, "address" character varying, "agency" character varying, CONSTRAINT "PK_97337ccbf692c58e6c7682de8a2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "prospections" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "seller_id" uuid, "user_id" uuid NOT NULL, "city" character varying, "status" character varying, "address" character varying, "link" character varying, "price" integer, "counter_proposal" integer, "emission_date" TIMESTAMP, "offer_id" uuid, "construction_cost" integer, "rents" json, "resume" text, "comment" text, CONSTRAINT "PK_60d6aa4141032b25eb65b88db5a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "offers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" integer NOT NULL, "prospection_id" uuid NOT NULL, CONSTRAINT "PK_4c88e956195bba85977da21b8f4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "prospector_tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "tokens" integer NOT NULL, CONSTRAINT "PK_bbc952d08aac52417b9d8b4260d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "offers" ADD CONSTRAINT "FK_f529f1a5e8445fe4114cf341e79" FOREIGN KEY ("prospection_id") REFERENCES "prospections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "offers" DROP CONSTRAINT "FK_f529f1a5e8445fe4114cf341e79"`);
        await queryRunner.query(`DROP TABLE "prospector_tokens"`);
        await queryRunner.query(`DROP TABLE "offers"`);
        await queryRunner.query(`DROP TABLE "prospections"`);
        await queryRunner.query(`DROP TABLE "sellers"`);
    }

}
