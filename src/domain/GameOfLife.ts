const neighbourOffset = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
interface Cell<T> {
    row: number;
    col: number;
    value: T;
}
class Grid<T> {
    private rows : number;
    private cols : number;
    private defaultValue : T;
    private data : Array<Array<T>>;
    public constructor(rows : number, cols : number, defaultValue : T) {
        this.rows = rows;
        this.cols = cols;
        this.defaultValue = defaultValue;
        this.data = new Array<Array<T> | undefined>(rows)
            .fill(undefined)
            .map(
                () => new Array<T>(cols)
                .fill(defaultValue));
    }
    
    public static clone<T>(grid : Grid<T>) : Grid<T> {
        var newGrid = new Grid<T>(grid.rows, grid.cols, grid.defaultValue);
        
        for (let row = 0; row < grid.rows; ++row) {
            for (let col = 0; col < grid.cols; ++col) {
                newGrid.data[row][col] = grid.getCell(row, col).value;
            }
        }

        return newGrid;
    }

    public getCell(row : number, col : number) : Cell<T> {
        return {row, col, value: this.data[row][col] };
    }

    public setCell(cell : Cell<T>, value : T) : void {
        this.data[cell.row][cell.col] = value;
    }

    public resetGrid() : void {
        for (let row = 0; row < this.rows; ++row) {
            for (let col = 0; col < this.cols; ++col) {
                this.setCell(this.getCell(row, col), this.defaultValue);
            }
        }
    }
    
    public isNeighbour(cell1 : Cell<T>, cell2 : Cell<T>) : boolean {
        return (Math.abs(cell1.row - cell2.row) <= 1 && Math.abs(cell1.col - cell2.col) <= 1)
    }

    public *cells() : IterableIterator<Cell<T>> {
        for (let row = 0; row < this.rows; ++row) {
            for (let col = 0; col < this.cols; ++col) {
                yield this.getCell(row, col);
            }
        }
    }

    public *neighbours(cell : Cell<T>) : IterableIterator<Cell<T>> {
        let nRow, nCol;
        for (let offset of neighbourOffset) {
            nRow = cell.row + offset[0];
            nCol = cell.col + offset[1];
            if (!this.inBound(nRow, nCol)) continue;
            yield this.getCell(nRow, nCol);
        }
    }

    public neighbourCountWithPredicate(cell : Cell<T>, predicate : (cell : Cell<T>) => boolean) : number {
        var cnt = 0;
        for (let n of this.neighbours(cell)) {
            if (predicate(this.getCell(n.row, n.col))) {
                ++cnt;
            }
        }
        return cnt;
    }

    public inBound(row : number, col : number) : boolean {
        return !(row < 0 || row >= this.rows || col < 0 || col >= this.cols);
    }
}

const overpopulationThreshold = 4
const birthValue = 3
const deathThreshold = 1
enum CellStatus {
    ALIVE,
    DEAD
}
class GameOfLife {
    private _grid: Grid<CellStatus>;
    public constructor(mapSizeRows : number, mapSizeCols : number) {
        this._grid = new Grid<CellStatus>(mapSizeRows, mapSizeCols, CellStatus.DEAD);
    }

    public tick() : void {
        let newGrid = Grid.clone<CellStatus>(this.grid);
        for (let cell of this.grid.cells()) {
            if (cell.value === CellStatus.ALIVE) {
                this.checkAliveCell(cell) && newGrid.setCell(cell, CellStatus.DEAD);
            } else {
                this.checkDeadCell(cell) && newGrid.setCell(cell, CellStatus.ALIVE);
            } 
        }

        this._grid = newGrid;
    }

    protected getAliveNeighbourCount(cell : Cell<CellStatus>) : number {
        return this.grid.neighbourCountWithPredicate(cell, cell => cell.value === CellStatus.ALIVE);
    }

    protected checkDeadCell(cell : Cell<CellStatus>) : boolean {
        return (this.getAliveNeighbourCount(cell) === birthValue);
    }

    protected checkAliveCell(cell : Cell<CellStatus>) : boolean {
        return (this.getAliveNeighbourCount(cell)  <= deathThreshold) || (this.getAliveNeighbourCount(cell)  >= overpopulationThreshold);
    }

    get grid() : Grid<CellStatus> {
        return this._grid;
    }
}

export { GameOfLife, Grid, CellStatus }