import { findWinner, getAvailableCells, randomRange } from '../../shared/utils';
import { RootState, setValue, setWinner } from './store';
import { Dispatch } from 'redux';
import { TableSymbol } from '../../shared/interfaces';


export function createListeners(fns: Array<(getState: () => any, dispatch: Dispatch) => void>): (getState: () => any, dispatch: Dispatch) => () => void {
    return (getState: () => any, dispatch: Dispatch): () => void => {
        return () => {
            fns.map(fn => fn(getState, dispatch))
        }
    }

}

export function checkWinner(getState: () => any, dispatch: Dispatch): void {
    const {game} = getState();
    const {winner, state} = game;
    if (winner) {
        return
    }
    const res = findWinner(state)
    if (res !== null) {
        dispatch(setWinner(res));
    }
}

export function makeNextStep(getState: () => RootState, dispatch: Dispatch): void {
    const {game} = getState();
    const {winner, state, chosenSymbol, currentPlayer} = game;
    if (chosenSymbol === currentPlayer) {
        return;
    }

    if (!winner) {
        const available = getAvailableCells(state);
        if (available.length) {
            const botStep = randomRange(0, available.length - 1);
            const botValue = {
                symbol: TableSymbol.O, row: available[botStep][0],
                col: available[botStep][1],
            }
            setTimeout(() =>dispatch(setValue(botValue)), 500);
        }
    }
}

