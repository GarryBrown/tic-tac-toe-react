import React, { ReactElement } from 'react';
import { CellValue } from './interfaces';
import { Cell } from './Cell';

interface IProps {
    table: CellValue[][];
    click: (ir: number, ic: number) => void
    children?: ReactElement[] | never[]
}

export function Table({table, click, children}: IProps): ReactElement {
    return (
        <table className="redux-impl-table">

            {children}

            <tbody>
            {table.map((row, ir) =>
                <tr key={ir}>
                    {row.map((col, ic) =>
                        <td key={ic} onClick={() => click(ir, ic)}>
                            <Cell
                                cross={table[ir][ic] === 'X'}
                                zero={table[ir][ic] === 'O'}
                            />
                        </td>,
                    )}
                </tr>,
            )}
            </tbody>
        </table>
    )
}