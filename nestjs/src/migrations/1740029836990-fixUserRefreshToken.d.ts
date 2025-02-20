import { MigrationInterface, QueryRunner } from "typeorm";
export declare class FixUserRefreshToken1740029836990 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
