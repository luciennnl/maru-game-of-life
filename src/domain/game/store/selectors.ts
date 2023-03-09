import { createSelector, createSelectorCreator, defaultMemoize } from "reselect";
import { Dimension } from "../../collections/grid";
import { CellStatus } from "../gameOfLife";
import { GameStoreState } from "./gameStore";

/**
 * Custom selector for gridSize - deep comparison
 */
const gridSizeSelectorCreator = createSelectorCreator(defaultMemoize, (a: Dimension, b: Dimension) => a.rows === b.rows && a.cols === b.cols);

/**
 * Memoized selector for gridSize
 */
const gridSizeSelector = gridSizeSelectorCreator(
    [ (state: GameStoreState): Dimension => state.gameState.grid.gridSize ],
    (gridSize) => gridSize
)

/**
 * Memoized selector creator for cell status
 * @param row the row of the target cell
 * @param col the column of the target cell
 * @returns a memoized cellstatus selector
 */
const gridCellSelectorCreator = (row: number, col: number) => createSelector(
    [ (state: GameStoreState): CellStatus => state.gameState.grid.getValue(row, col) ],
    (gridCell) => gridCell
)

export { gridCellSelectorCreator, gridSizeSelector };