"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProspectionDelete1737437357005 = void 0;
class UpdateProspectionDelete1737437357005 {
    constructor() {
        this.name = 'UpdateProspectionDelete1737437357005';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "offers" DROP CONSTRAINT "FK_f529f1a5e8445fe4114cf341e79"`);
        await queryRunner.query(`ALTER TABLE "offers" ADD CONSTRAINT "FK_f529f1a5e8445fe4114cf341e79" FOREIGN KEY ("prospection_id") REFERENCES "prospections"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "offers" DROP CONSTRAINT "FK_f529f1a5e8445fe4114cf341e79"`);
        await queryRunner.query(`ALTER TABLE "offers" ADD CONSTRAINT "FK_f529f1a5e8445fe4114cf341e79" FOREIGN KEY ("prospection_id") REFERENCES "prospections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
exports.UpdateProspectionDelete1737437357005 = UpdateProspectionDelete1737437357005;
//# sourceMappingURL=1737437357005-updateProspectionDelete.js.map