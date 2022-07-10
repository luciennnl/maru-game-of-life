import Grid, { Cell } from "./grid";
const neighbourOffset = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

class GridUtil {
    private static instance : GridUtil | null = null;
    private constructor() {}

    public static getInstance<T>() : GridUtil {
        if (GridUtil.instance === null) {
            GridUtil.instance = new GridUtil();
        }
        return GridUtil.instance;
    }
    public *neighbours<T>(grid : Grid<T>, cell : Cell<T>) : IterableIterator<Cell<T>> {
        let nRow, nCol;
        for (let offset of neighbourOffset) {
            nRow = cell.row + offset[0];
            nCol = cell.col + offset[1];
            if (!grid.inBound(nRow, nCol)) continue;
            yield grid.getCell(nRow, nCol);
        }
    }

    public neighbourCountWithPredicate<T>(grid : Grid<T>, cell : Cell<T>, predicate : (cell : Cell<T>) => boolean) : number {
        var cnt = 0;
        for (let n of this.neighbours(grid, cell)) {
            if (predicate(grid.getCell(n.row, n.col))) {
                ++cnt;
            }
        }
        return cnt;
    }
}

export default GridUtil;