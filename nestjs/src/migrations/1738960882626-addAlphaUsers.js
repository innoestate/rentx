"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddAlphaUsers1738960882626 = void 0;
class AddAlphaUsers1738960882626 {
    constructor() {
        this.name = 'AddAlphaUsers1738960882626';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "alpha_users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_c934eeeac402244591064787c48" UNIQUE ("email"), CONSTRAINT "PK_bc63c9d17a4c058d7c81989922a" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "alpha_users"`);
    }
}
exports.AddAlphaUsers1738960882626 = AddAlphaUsers1738960882626;
//# sourceMappingURL=1738960882626-addAlphaUsers.js.map