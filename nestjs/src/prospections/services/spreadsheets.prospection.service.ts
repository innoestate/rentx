import { Injectable } from "@nestjs/common";
import { SpreadSheetStrategy } from "src/spreadsheets/strategies/spreadsheets.strategy";
import { ProspectionDb } from "../dto/prospection.db";

@Injectable()
export class ProspectionSpreadsheetService {

  constructor() { }

  synchronizeProspections(sheetStrategy: SpreadSheetStrategy, prospections: ProspectionDb[]) {

    

  }

}