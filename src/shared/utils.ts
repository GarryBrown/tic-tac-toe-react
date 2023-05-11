import { CellValue, TableSymbol } from './interfaces';


export function getAvailableCells(table: Array<CellValue[]>): [number, number][] {
    return findSymbolPos(table, null);
}

export function randomRange(max: number = 0, min: number = 0): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function findWinner(table: Array<CellValue[]>): TableSymbol | null {
    const xSteps = findSymbolPos(table, TableSymbol.X);
    const oSteps = findSymbolPos(table, TableSymbol.O);
    return isWinner(xSteps) ? TableSymbol.X : isWinner(oSteps) ? TableSymbol.O : null;
}

function findSymbolPos(table: CellValue[][], symbol: CellValue): [number, number][] {
    return table.reduce((acc: [number, number][], row: CellValue[], ir: number) =>
            acc.concat(row.map<[number, number] | undefined>((col, ic: number) => col === symbol ? [ir, ic] : undefined).filter(Boolean) as [number, number][]),
        [])
}

const winMap: Record<string, RegExp> = {
    firstRow: /(0,[0-2]){3}/,
    secondRow: /(1,[0-2]){3}/,
    thirdRow: /(2,[0-2]){3}/,
    firstCol: /([0-2],0(\d|,|$)*){3}/,
    secondCol: /([0-2],1(\d|,|$)*){3}/,
    thirdCol: /([0-2],2(\d|,|$)*){3}/,
    lDiag: /0,0(\d|,|$)*1,1(\d|,|$)*2,2/,
    rDiag: /(\d|,|$)*0,2(\d|,|$)*1,1(\d|,|$)*2,0/,
}

export function calculateWinPos(table: CellValue[][], winSymbol: TableSymbol): string | undefined {
    const xSteps = findSymbolPos(table, winSymbol);
    const sorted = [...xSteps].sort().join('');
    return Object.keys(winMap).find(k => winMap[k].test(sorted));

}

const row = /((0,[0-2]){3})|((1,[0-2]){3})|((2,[0-2]){3})/
const col = /(([0-2],0(\d|,|$)*){3})|(([0-2],1(\d|,|$)*){3})|(([0-2],2(\d|,|$)*){3})/
const ld = winMap.lDiag;
const rl = winMap.rDiag;

function isWinner(occupied: [number, number][]): boolean {
    const a = [...occupied].sort().join('')
    return ld.test(a) || rl.test(a) || row.test(a) || col.test(a)
}
