import Grid, {
    Cell
} from "./grid";

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

class GridUtil < K > {

    private grid : Grid < K >;

    private constructor(grid : Grid < K > ) {
        this.grid = grid;
    }

    public static getInstance<T>(grid: Grid < T >): GridUtil < T > {
        return new GridUtil < T > (grid);
    }

    public * neighbours (cell: Cell < K > ): IterableIterator < Cell < K >> {
        let nRow, nCol;
        for (let offset of neighbourOffset) {
            nRow = cell.row + offset[0];
            nCol = cell.col + offset[1];
            if (!this.grid.inBound(nRow, nCol)) continue;
            yield this.grid.getCell(nRow, nCol);
        }
    }

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