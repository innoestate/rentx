import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddLastSynchronizationInDocs1737903505000 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
