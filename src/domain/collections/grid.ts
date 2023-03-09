/**
 * Type representing a location on the grid
 */
interface Cell < T > {
    row: number;
    col: number;
    value: T;
}

/**
 * Type representing the dimensions of a grid
 */
interface Dimension {
    rows: number;
    cols: number;
}

/**
 * Class representing a Grid-like data structure, containing cells of type T
 */
class Grid < T > {
    /**
     * Number indicating the amount of rows in the grid
     */
    private rows: number;
    
    /**
     * Number indicating the amount of columns in the grid
     */
    private cols: number;

    /**
     * T indicating the default value of the cells in the grid
     */
    private defaultValue: T;

    /**
     * 2d array of Ts representing the values in the grid
     */
    private data: Array < Array < T >> ;

    /**
     * Constructor for the Grid class
     * @param rows the amount of rows in the grid structure
     * @param cols the amount of columns in the grid structure
     * @param defaultValue the default and initial value of the cells in the grid structure
     */
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

    /**
     * Clones an existing instance of Grid
     * @param grid the instance to clone
     * @returns a new Grid instance
     */
    public static clone < T > (grid: Grid < T > ): Grid < T > {
        var newGrid = new Grid < T > (grid.rows, grid.cols, grid.defaultValue);

        for (let row = 0; row < grid.rows; ++row) {
            for (let col = 0; col < grid.cols; ++col) {
                newGrid.data[row][col] = grid.getCell(row, col).value;
            }
        }

        return newGrid;
    }

    /**
     * Iterator for the cells in this grid by row then column
     */
    public * cells(): IterableIterator < Cell < T >> {
        for (let row = 0; row < this.rows; ++row) {
            for (let col = 0; col < this.cols; ++col) {
                yield this.getCell(row, col);
            }
        }
    }

    /**
     * Checks whether or not two cells are neighbours
     * @param cell1 the first cell
     * @param cell2 the second cell
     * @returns a boolean indicating whether or not the cells are neighbours
     */
    public isNeighbour(cell1: Cell < T > , cell2: Cell < T > ): boolean {
        return (Math.abs(cell1.row - cell2.row) <= 1 && Math.abs(cell1.col - cell2.col) <= 1)
    }

    /**
     * Check whether or not a specified row and column are in the bounds of the grid
     * @param row the row to check
     * @param col the column to check
     * @returns a boolean indicating if the specified row and column are in bounds
     */
    public inBound(row: number, col: number): boolean {
        return !(row < 0 || row >= this.rows || col < 0 || col >= this.cols);
    }

    /**
     * Sets all of the cells in the grid to defaultValue
     */
    public resetGrid(): void {
        for (let row = 0; row < this.rows; ++row) {
            for (let col = 0; col < this.cols; ++col) {
                this.setValue(row, col, this.defaultValue);
            }
        }
    }

    /**
     * Getter for the value of a cell in the grid
     * @param row the row of the cell
     * @param col the column of th cell
     * @returns the value of the target cell
     */
    public getValue(row: number, col: number): T {
        return this.data[row][col];
    }

    /**
     * Getter for a particular cell in the grid
     * @param row the row of the cell
     * @param col the column of the cell
     * @returns a Cell located on (row, col) of the grid
     */
    public getCell(row: number, col: number): Cell < T > {
        return {
            row,
            col,
            value: this.data[row][col]
        };
    }

    /**
     * Setter for the value of a cell in the grid
     * @param row the row of the target cell
     * @param col the column of the target cell
     * @param value the value to set
     */
    public setValue(row: number, col: number, value: T): void {
        this.data[row][col] = value;
    }
    /**
     * Setter for a particular cell in the grid
     * @param cell the cell to set
     */
    public setCell(cell: Cell < T >): void {
        this.data[cell.row][cell.col] = cell.value;
    }

    /**
     * Gets the dimensions of the grid
     */
    public get gridSize() {
        return {
            rows: this.rows,
            cols: this.cols
        }
    }
}

export default Grid;
export {
    Cell,
    Dimension
};