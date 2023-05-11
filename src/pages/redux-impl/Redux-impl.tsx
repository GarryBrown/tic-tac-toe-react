import { Provider, useDispatch, useSelector } from 'react-redux'
import './Redux-impl.css';
import React from 'react';
import store, { reset, setValue, tableSelector, winnerSelector, winPositionSelector } from './store';
import { TableSymbol } from '../../shared/interfaces';
import { Table } from '../../shared/Table';
import { Winner } from '../../shared/Winner';
import { WinLine } from '../../shared/Win-line';

export function ReduxImpl() {
    const table = useSelector(tableSelector);
    const winner = useSelector(winnerSelector);
    const winPos = useSelector(winPositionSelector);
    const dispatch = useDispatch();

    const onClickFn = (row: number, col: number) => {
        if (winner) {
            return
        }
        const symbol = TableSymbol.X;
        dispatch(setValue({symbol, col, row}))
    }

    const onReset = () => dispatch(reset());

    return (
        <Provider store={store}>
            <div className="redux-impl">
                <div className="redux-impl-block">

                    <div>
                        <button onClick={onReset}>Reset</button>
                        {winner && <Winner name={winner}/>}
                        {winner && <p>{winPos}</p>}
                        <Table click={onClickFn} table={table}>
                            {/*<WinLine/>*/}
                        </Table>
                    </div>

                </div>
            </div>
        </Provider>
    )
}