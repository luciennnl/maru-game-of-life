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

class GameOfLife {
    private _grid: Grid <CellStatus>;
    private _isMobile: boolean;
    public constructor(isMobile? : boolean) {
        let {
            rows,
            cols
        } = isMobile ? GameConfiguration.gameMapSizeMobile : GameConfiguration.gameMapSize;
        this._grid = new Grid <CellStatus> (rows, cols, CellStatus.DEAD);
        this._isMobile = isMobile || false;
    }

    public tick(): void {
        let newGrid = Grid.clone <CellStatus> (this.grid);
        for (let cell of this.grid.cells()) {
            if (cell.value === CellStatus.ALIVE) {
                this.checkAliveCell(cell) && newGrid.setCell(cell, CellStatus.DEAD);
            } else {
                this.checkDeadCell(cell) && newGrid.setCell(cell, CellStatus.ALIVE);
            }
        }

        this._grid = newGrid;
    }
    public static clone(original: GameOfLife): GameOfLife {
        let cloned = new GameOfLife(original._isMobile);
        cloned.grid = Grid.clone(original.grid);
        return cloned;
    }
    private getAliveNeighbourCount(cell: Cell <CellStatus> ): number {
        return GridUtil.getInstance(this._grid).neighbourCountWithPredicate(cell, cell => cell.value === CellStatus.ALIVE);
    }

    private checkDeadCell(cell: Cell <CellStatus> ): boolean {
        return (this.getAliveNeighbourCount(cell) === birthValue);
    }

    private checkAliveCell(cell: Cell <CellStatus> ): boolean {
        return (this.getAliveNeighbourCount(cell) <= deathThreshold) || (this.getAliveNeighbourCount(cell) >= overpopulationThreshold);
    }

    public get grid(): Grid <CellStatus> {
        return this._grid;
    }

    public get isMobile(): boolean {
        return this._isMobile;
    }

    protected set grid(toSet: Grid <CellStatus> ) {
        this._grid = toSet;
    }
}

export default GameOfLife;
export {
    GameStatus,
    CellStatus
};