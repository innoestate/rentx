import { MigrationInterface, QueryRunner } from "typeorm";
export declare class SetUserIdInOffers1737266888572 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
