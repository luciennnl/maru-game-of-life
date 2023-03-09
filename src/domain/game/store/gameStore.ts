import GameOfLife, {
    CellStatus,
    GameStatus
} from "../gameOfLife";
import {
    configureStore
} from "@reduxjs/toolkit";
import {
    Cell
} from "../../collections/grid";

/**
 * Type representing an action to create the next generation of game cells
 */
interface GameStateActionTick {
    type: 'tick';
}

/**
 * Type representing an action to change the status of a game cell
 */
interface GameStateActionChangeCell {
    type: 'changecell';
    cell: Cell < CellStatus > ;
    value: CellStatus;
}

/**
 * Type representing an action the reset the current game state
 */
interface GameStateActionReset {
    type: 'reset';
}

/**
 * Type representing an action to create a new GameOfLife context
 */
interface GameStateActionHardReset {
    type: 'hardreset';
}

/**
 * Type representing an action to change the target device type
 */
interface GameStateActionChangeDevice {
    type: 'changedevice';
    isMobile: boolean;
}

type GameStateAction = GameStateActionTick | GameStateActionChangeCell | GameStateActionReset | GameStateActionHardReset | GameStateActionChangeDevice ;

/**
 * Reducer for the gamestate
 * @param state a GameOfLife object representing the current game state
 * @param action the action to execute
 * @returns the new gamestate
 */
const gameStateReducer = (state: GameOfLife = new GameOfLife(), action: GameStateAction): GameOfLife => {
    let newState = GameOfLife.clone(state);
    switch (action.type) {
        case 'tick':
            newState.tick();
            return newState;
        case 'changecell':
            newState.grid.setCell(action.cell, action.value);
            return newState;
        case 'reset':
            newState.grid.resetGrid();
            return newState;
        case 'hardreset':
            return new GameOfLife();
        case 'changedevice':
            if (newState.isMobile !== action.isMobile) {
                return new GameOfLife(action.isMobile);
            }
            return newState;
        default:
            return newState;
    }
}

/**
 * Type representing an action to start the game
 */
interface GameStatusActionStart {
    type: 'start';
}

/**
 * Type representing an action to stop the game
 */
interface GameStatusActionStop {
    type: 'stop';
}

/**
 * Type representing an action to control game status
 */
type GameStatusAction = GameStatusActionStart | GameStatusActionStop;

/**
 * Reducer for the game status
 * @param state a GameStatus enum representing the current game state
 * @param action the action to execute
 * @returns the new game status
 */
const gameStatusReducer = (state: GameStatus = GameStatus.STOPPED, action: GameStatusAction): GameStatus => {
    switch (action.type) {
        case 'start':
            return GameStatus.STARTED;
        case 'stop':
            return GameStatus.STOPPED;
        default:
            return state;
    }
}

/**
 * Redux store for the Game of Life context
 */
const store = configureStore({
    reducer: {
        gameStatus: gameStatusReducer,
        gameState: gameStateReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export default store;
export type RootState = ReturnType < typeof store.getState >;
export type GameDispatch = typeof store.dispatch;