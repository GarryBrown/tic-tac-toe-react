import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { checkWinner, createListeners, makeNextStep } from './listeners';
import { CellValue, ISymbol, TableSymbol } from '../../shared/interfaces';
import { calculateWinPos } from '../../shared/utils';

interface SetPayload {
    symbol: ISymbol,
    row: number,
    col: number
}

const initialTable: CellValue[][] = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
]

export interface GameState {
    state: CellValue[][],
    chosenSymbol: ISymbol,
    currentPlayer: ISymbol,
    winner: CellValue,
}

const initialState: GameState = {
    state: initialTable,
    chosenSymbol: TableSymbol.X,
    winner: null,
    currentPlayer: TableSymbol.X,
}
const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setValue: (state: GameState, action: PayloadAction<SetPayload>) => {
            const {symbol, col, row} = action.payload;
            if (symbol !== state.currentPlayer) {
                return;
            }
            if (state.state[row][col] !== null) {
                return;
            }
            state.currentPlayer = symbol === TableSymbol.X ? TableSymbol.O : TableSymbol.X
            state.state = state.state.map((r, ir) => r.map((c, ic) => row === ir && col === ic ? symbol : c))
        },
        setWinner: (state: GameState, action: PayloadAction<ISymbol>) => ({...state, winner: action.payload}),
        reset: () => ({...initialState}),
    },
})

export const {setValue, reset, setWinner} = gameSlice.actions;


const store = configureStore({
    reducer: {
        game: gameSlice.reducer,
    },
})

store.subscribe(
    createListeners([checkWinner, makeNextStep])(store.getState, store.dispatch),
)

export const tableSelector = (state: RootState) => state.game.state;
export const winnerSelector = (state: RootState) => state.game.winner;
export const winPositionSelector = (state: RootState) => state.game.winner && calculateWinPos(state.game.state, state.game.winner);

export type RootState = ReturnType<typeof store.getState>
export default store