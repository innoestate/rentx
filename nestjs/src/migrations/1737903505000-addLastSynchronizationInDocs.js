"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddLastSynchronizationInDocs1737903505000 = void 0;
class AddLastSynchronizationInDocs1737903505000 {
    constructor() {
        this.name = 'AddLastSynchronizationInDocs1737903505000';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "docs" ADD "lastSynchronization" TIMESTAMP NOT NULL DEFAULT now()`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "docs" DROP COLUMN "lastSynchronization"`);
    }
}
exports.AddLastSynchronizationInDocs1737903505000 = AddLastSynchronizationInDocs1737903505000;
//# sourceMappingURL=1737903505000-addLastSynchronizationInDocs.js.map