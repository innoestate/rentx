import { Injectable } from "@nestjs/common";
import { SpreadSheetStrategy } from "src/spreadsheets/strategies/spreadsheets.strategy";
import { ProspectionDb } from "../dto/prospection.db";

@Injectable()
export class ProspectionSpreadsheetService {

  constructor() { }

  synchronizeProspections(user_id: string,sheetStrategy: SpreadSheetStrategy): string {

    //get all the prospections of the user
    //if the spreadsheet is not created, create it
      //create a spreadsheet with a page for prospection and a page for sellers
    //get the spreadsheet and update it
      //add the prospections to the spreadsheet
      


    return '0';
  }

}