import Grid, {
    Cell
} from "../collections/grid";
import GridUtil from "../collections/gridUtil";
import GameConfiguration from "./gameConfiguration";

const overpopulationThreshold = 4
const birthValue = 3
const deathThreshold = 1

enum GameStatus {
    STARTED,
    STOPPED
}

enum CellStatus {
    ALIVE,
    DEAD
}

/**
 * Class representing the Game context. Encapsulates all the data required to
 * simulate Conway's game of life
 */
class GameOfLife {
    /**
     * Grid containing the cells on the game map
     */
    private _grid: Grid <CellStatus>;
    
    /**
     * Boolean to indicate if the GameOfLife is operating in mobile resolution
     */
    private _isMobile: boolean;

    /**
     * Constructor for GameOfLife class
     * @param isMobile whether or not the game map should be in mobile mode resolution
     */
    public constructor(isMobile? : boolean) {
        let {
            rows,
            cols
        } = isMobile ? GameConfiguration.gameMapSizeMobile : GameConfiguration.gameMapSize;
        this._grid = new Grid <CellStatus> (rows, cols, CellStatus.DEAD);
        this._isMobile = isMobile || false;
    }

    /**
     * Creates the next generation of cells
     */
    public tick(): void {
        let newGrid = Grid.clone <CellStatus> (this.grid);
        for (let cell of this.grid.cells()) {
            if (cell.value === CellStatus.ALIVE) {
                this.checkAliveCell(cell) && newGrid.setValue(cell.row, cell.col, CellStatus.DEAD);
            } else {
                this.checkDeadCell(cell) && newGrid.setValue(cell.row, cell.col, CellStatus.ALIVE);
            }
        }

        this._grid = newGrid;
    }

    /**
     * Clones an existing instance of GameOfLife
     * @param original the instance to clone
     * @returns a new GameOfLife instance
     */
    public static clone(original: GameOfLife): GameOfLife {
        let cloned = new GameOfLife(original._isMobile);
        cloned.grid = Grid.clone(original.grid);
        return cloned;
    }

    /**
     * Counts the amount of alive neighbouring cells
     * @param cell the cell to check around
     * @returns a number indicating the amount of alive neighbouring cells
     */
    private getAliveNeighbourCount(cell: Cell <CellStatus> ): number {
        return GridUtil.getInstance(this._grid).neighbourCountWithPredicate(cell, cell => cell.value === CellStatus.ALIVE);
    }

    /**
     * Checks whether or not a dead cell should respawn
     * @param cell the cell to check
     * @returns a boolean indicating if the cell should respawn
     */
    private checkDeadCell(cell: Cell <CellStatus> ): boolean {
        return (this.getAliveNeighbourCount(cell) === birthValue);
    }

    /**
     * Checks whether or not an alive cell should die
     * @param cell the cell to check
     * @returns a boolean indicating if the cell should die
     */
    private checkAliveCell(cell: Cell <CellStatus> ): boolean {
        return (this.getAliveNeighbourCount(cell) <= deathThreshold) || (this.getAliveNeighbourCount(cell) >= overpopulationThreshold);
    }

    /**
     * Getter for the grid property
     */
    public get grid(): Grid <CellStatus> {
        return this._grid;
    }

    /**
     * Getter for the isMobile property
     */
    public get isMobile(): boolean {
        return this._isMobile;
    }

    /**
     * Setter for the grid property
     */
    protected set grid(toSet: Grid <CellStatus> ) {
        this._grid = toSet;
    }
}

export default GameOfLife;
export {
    GameStatus,
    CellStatus
};