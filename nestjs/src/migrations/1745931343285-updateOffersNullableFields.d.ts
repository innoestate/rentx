import { MigrationInterface, QueryRunner } from "typeorm";
export declare class UpdateOffersNullableFields1745931343285 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
