import { MigrationInterface, QueryRunner } from "typeorm";
export declare class Release0111735037453685 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
