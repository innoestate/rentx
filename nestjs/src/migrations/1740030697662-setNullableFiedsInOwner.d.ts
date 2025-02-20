import { MigrationInterface, QueryRunner } from "typeorm";
export declare class SetNullableFiedsInOwner1740030697662 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
