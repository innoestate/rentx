import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProspectorAiTables1736619147936 implements MigrationInterface {
    name = 'AddProspectorAiTables1736619147936'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "prospector_ai_offers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "prospection_id" uuid NOT NULL, "owner_id" uuid NOT NULL, "seller_id" uuid NOT NULL, "content" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_29e814ddb796da7b31ae38f5040" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "prospector_ai_view_summarize" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "summarize_long" text NOT NULL, "summarize_short" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1525f625a601245630716ae7454" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "prospector_ai_view_history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "model" character varying NOT NULL, "role" character varying NOT NULL, "content" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c018eb7ae23fe5cad0407a586d5" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "prospector_ai_view_history"`);
        await queryRunner.query(`DROP TABLE "prospector_ai_view_summarize"`);
        await queryRunner.query(`DROP TABLE "prospector_ai_offers"`);
    }

}
