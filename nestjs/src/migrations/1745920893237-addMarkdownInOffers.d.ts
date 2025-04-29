import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddMarkdownInOffers1745920893237 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
