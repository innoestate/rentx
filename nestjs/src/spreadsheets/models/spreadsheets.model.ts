export interface Sheet {
    sheetId: number;
    title: string;
    rows: Cell[][];
}

export interface Cell {
    value: string | number;
    backgroundColor?: BackgroundColor;
}

export interface BackgroundColor {
    red?: number | null,
    green?: number | null,
    blue?: number | null,
    alpha?: number | null
}

export interface SpreadSheet {
    id: string;
    sheets: Sheet[];
    title: string;
}

export interface SpreadSheetUpdate {
    sheetTitle: string,
    cell: string;//ex: 'G2'
    backgroundColor?: BackgroundColor;
    value: string | number;
}
