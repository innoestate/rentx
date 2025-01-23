import { Estate_filled_Db } from "../../estates/estate-filled-db.model";
import { Sheet, Cell, SpreadSheet, SpreadSheetUpdate } from "../models/spreadsheets.model";
import { SpreadSheetStrategy } from "./spreadsheets.strategy";

export class MockedGoogleSpreadSheetStrategy extends SpreadSheetStrategy {

    fakeSpreadSheets: { [id: string]: SpreadSheet } = {};

    constructor() {
        super();
    }

    async getSpreadSheet(id: string): Promise<SpreadSheet> {
        return this.fakeSpreadSheets[id];
    }

    async createSpreadSheet(title: string): Promise<SpreadSheet> {
        this.fakeSpreadSheets['fakeId'] = {
            id: 'fakeId',
            title,
            sheets: []
        }
        return this.fakeSpreadSheets['fakeId'];
    }

    async addSheet(id: string, title: string, header: Cell[], rows: Cell[][]): Promise<SpreadSheet> {
        const newSheet = {
            sheetId: this.fakeSpreadSheets[id].sheets.length,
            title,
            rows: [header, ...rows]
        }
        this.fakeSpreadSheets[id].sheets.push(newSheet);
        return this.fakeSpreadSheets[id];
    }

    async addSheets(id: string, sheets: { title: string, header: Cell[], rows: Cell[][] }[]): Promise<SpreadSheet> {
        sheets.forEach(sheet => {
            this.addSheet(id, sheet.title, sheet.header, sheet.rows);
        })
        return this.fakeSpreadSheets[id];
    }

    async addRowsInSheets(id: string, missings: { sheetTitle: string, missingRows: Cell[][] }[]): Promise<SpreadSheet> {
        missings.forEach(missing => {
            const rows = this.fakeSpreadSheets[id].sheets.find(sheet => sheet.title === missing.sheetTitle)?.rows;
            if (rows) {
                rows.push(
                    ...missing.missingRows
                )
                this.fakeSpreadSheets[id].sheets.find(sheet => sheet.title === missing.sheetTitle).rows = rows;
            }
        })
        return this.fakeSpreadSheets[id];
    }

    async removeRowsInSheets(id: string, rowIdentifiers: { [key: string]: string | number }[]): Promise<SpreadSheet> {

        if(rowIdentifiers.length === 0) 
            return this.fakeSpreadSheets[id];

        rowIdentifiers.forEach(rowIdentifier => {

            for (let i = 0; i < this.fakeSpreadSheets[id].sheets.length; i++) {

                const indexes = {};
                Object.keys(rowIdentifier).forEach(key => {
                    indexes[key] = this.fakeSpreadSheets[id].sheets[i].rows[0].findIndex(cell => cell.value === key);
                });
                
                this.fakeSpreadSheets[id].sheets[i].rows = this.fakeSpreadSheets[id].sheets[i].rows.filter(rows => {
                    let cellsIdentified = 0;
                    Object.keys(indexes).forEach(key => {
                        if (rows[indexes[key]].value === rowIdentifier[key]) {
                            cellsIdentified++;
                        }
                    });
                    if (cellsIdentified === Object.keys(indexes).length) {
                        return false;
                    }
                    return true;
                })
            }

        });

        return this.fakeSpreadSheets[id];
    }

    async getSheets(id: string): Promise<Sheet[]> {
        return this.fakeSpreadSheets[id]?.sheets ?? [];
    }

    async updateCells(spreadSheet: SpreadSheet, cellUpdates: SpreadSheetUpdate[]): Promise<SpreadSheet> {

        cellUpdates.forEach(update => {

            function extractNumberFromString(str: string): number {
                const match = str.match(/\d+/);
                return match ? parseInt(match[0], 10) : -1;
            }
            const rowIndex = extractNumberFromString(update.cell) - 1;
            const columnIndex = update.cell.charCodeAt(0) - 'A'.charCodeAt(0);
            spreadSheet.sheets.find(sheet => update.sheetTitle === sheet.title).rows[rowIndex][columnIndex].value = update.value;
            spreadSheet.sheets.find(sheet => update.sheetTitle === sheet.title).rows[rowIndex][columnIndex].backgroundColor = update.backgroundColor;

        });


        return spreadSheet;
    }

}