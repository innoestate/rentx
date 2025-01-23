import { Cell, Sheet, SpreadSheet, SpreadSheetUpdate } from "../models/spreadsheets.model";

export class SpreadSheetStrategy {
    
    async getSpreadSheet(id: string): Promise<SpreadSheet> {
        return null;
    }

    async createSpreadSheet( title: string): Promise<SpreadSheet> {
        return null;
    }

    async addSheet(id: string, title: string, heder: Cell[], rows: Cell[][]): Promise<SpreadSheet> {
        return null;
    }

    async addSheets(id: string, sheets: {title: string, header: Cell[], rows: Cell[][]}[]): Promise<SpreadSheet> {
        return null;
    }

    async addRowsInSheets(id: string, missings: {sheetTitle: string, missingRows: Cell[][] }[] ): Promise<SpreadSheet> {
        return null;
    }

    async removeRowsInSheets(id: string, rowIdentifier: {[key:string]: string | number}[] ): Promise<SpreadSheet> {
        return null;
    }

    async getSheets(id: string): Promise<Sheet[]> {
        return null;
    }

    async updateCells(spreadSheet: SpreadSheet, cellUpdates: SpreadSheetUpdate[]): Promise<SpreadSheet> {
        return null;
    }
}