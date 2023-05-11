export type ISymbol = TableSymbol.O | TableSymbol.X

export type CellValue = ISymbol | null;

export enum TableSymbol {
    X = 'X',
    O = 'O'
}