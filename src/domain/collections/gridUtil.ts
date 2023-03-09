import Grid, {
    Cell
} from "./grid";

/**
 * Constants defining the offsets for a cell's neighbours
 */
const neighbourOffset = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1]
];

/**
 * Utility class defining additional functions operating on Grid
 */
class GridUtil < K > {

    /**
     * The target grid of this instance
     */
    private grid : Grid < K >;

    /**
     * Constructor for GridUtil class
     * @param grid the target Grid instance
     */
    private constructor(grid : Grid < K > ) {
        this.grid = grid;
    }

    /**
     * Retrieves an instance of GridUtil for a particular Grid instance
     * @param grid the Grid instance to base off
     * @returns a new GridUtil instance
     */
    public static getInstance<T>(grid: Grid < T >): GridUtil < T > {
        return new GridUtil < T > (grid);
    }

    /**
     * Iterator for the neighbours of a particular cell
     * @param cell the cell to check neighbours for
     */
    public * neighbours (cell: Cell < K > ): IterableIterator < Cell < K >> {
        let nRow, nCol;
        for (let offset of neighbourOffset) {
            nRow = cell.row + offset[0];
            nCol = cell.col + offset[1];
            if (!this.grid.inBound(nRow, nCol)) continue;
            yield this.grid.getCell(nRow, nCol);
        }
    }

    /**
     * Counts the amount of neighbours around a cell that satisfies a predicate
     * @param cell the cell to check neighbours for
     * @param predicate the predicate to test neighbours for
     * @returns the amount of neighbours that satisfy the predicate
     */
    public neighbourCountWithPredicate (cell: Cell < K > , predicate: (cell: Cell < K > ) => boolean): number {
        var cnt = 0;
        for (let n of this.neighbours(cell)) {
            if (predicate(this.grid.getCell(n.row, n.col))) {
                ++cnt;
            }
        }
        return cnt;
    }
}

export default GridUtil;