interface Cell < T > {
    row: number;
    col: number;
    value: T;
}

class Grid < T > {
    private rows: number;
    private cols: number;
    private defaultValue: T;
    private data: Array < Array < T >> ;
    public constructor(rows: number, cols: number, defaultValue: T) {
        this.rows = rows;
        this.cols = cols;
        this.defaultValue = defaultValue;
        this.data = new Array < Array < T > | undefined > (rows)
            .fill(undefined)
            .map(
                () => new Array < T > (cols)
                .fill(defaultValue));
    }

    public static clone < T > (grid: Grid < T > ): Grid < T > {
        var newGrid = new Grid < T > (grid.rows, grid.cols, grid.defaultValue);

        for (let row = 0; row < grid.rows; ++row) {
            for (let col = 0; col < grid.cols; ++col) {
                newGrid.data[row][col] = grid.getCell(row, col).value;
            }
        }

        return newGrid;
    }

    public * cells(): IterableIterator < Cell < T >> {
        for (let row = 0; row < this.rows; ++row) {
            for (let col = 0; col < this.cols; ++col) {
                yield this.getCell(row, col);
            }
        }
    }

    public isNeighbour(cell1: Cell < T > , cell2: Cell < T > ): boolean {
        return (Math.abs(cell1.row - cell2.row) <= 1 && Math.abs(cell1.col - cell2.col) <= 1)
    }

    public inBound(row: number, col: number): boolean {
        return !(row < 0 || row >= this.rows || col < 0 || col >= this.cols);
    }

    public resetGrid(): void {
        for (let row = 0; row < this.rows; ++row) {
            for (let col = 0; col < this.cols; ++col) {
                this.setCell(this.getCell(row, col), this.defaultValue);
            }
        }
    }

    public getCell(row: number, col: number): Cell < T > {
        return {
            row,
            col,
            value: this.data[row][col]
        };
    }

    public setCell(cell: Cell < T > , value: T): void {
        this.data[cell.row][cell.col] = value;
    }

    public get gridSize() {
        return {
            rows: this.rows,
            cols: this.cols
        }
    }
}

export default Grid;
export {
    Cell
};