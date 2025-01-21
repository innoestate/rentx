"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddZipInProspectionAndZipAndCityInSeller1737480017659 = void 0;
class AddZipInProspectionAndZipAndCityInSeller1737480017659 {
    constructor() {
        this.name = 'AddZipInProspectionAndZipAndCityInSeller1737480017659';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "sellers" ADD "zip" character varying`);
        await queryRunner.query(`ALTER TABLE "sellers" ADD "city" character varying`);
        await queryRunner.query(`ALTER TABLE "prospections" ADD "zip" character varying`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "prospections" DROP COLUMN "zip"`);
        await queryRunner.query(`ALTER TABLE "sellers" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "sellers" DROP COLUMN "zip"`);
    }
}
exports.AddZipInProspectionAndZipAndCityInSeller1737480017659 = AddZipInProspectionAndZipAndCityInSeller1737480017659;
//# sourceMappingURL=1737480017659-addZipInProspectionAndZipAndCityInSeller.js.map