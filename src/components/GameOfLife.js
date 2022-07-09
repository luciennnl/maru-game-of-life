const neighbourOffset = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
class Grid {
    constructor(rows, cols, defaultValue) {
        this.rows = rows;
        this.cols = cols;
        this.data = new Array(rows).fill().map(() => new Array(cols).fill(defaultValue));
    }
    
    getCell(row, col) {
        return this.data[row][col];
    }

    setCell(row, col, value) {
        this.data[row][col] = value;
    }

    isNeighbour(row, col, oRow, oCol) {
        return (Math.abs(row - oRow) <= 1 && Math.abs(col - oCol) <= 1)
    }

    *cells() {
        for (let row = 0; row < this.rows; ++row) {
            for (let col = 0; col < this.cols; ++col) {
                yield {
                    row,
                    col,
                    value: this.getCell(row, col)
                }
            }
        }
    }

    *neighbours(row, col) {
        let nRow, nCol;
        for (let offset of neighbourOffset) {
            nRow = row + offset[0];
            nCol = col + offset[1];
            if (!this.inBound(nRow, nCol)) continue;
            yield ({
                row: nRow, 
                col: nCol,
                value: this.getCell(nRow, nCol)
            });
        }
    }

    neighbourCountWithPredicate(row, col, predicate) {
        var cnt = 0;
        for (let n of this.neighbours(row, col)) {
            if (predicate(this.getCell(n.row, n.col))) {
                ++cnt;
            }
        }
        return cnt;
    }

    inBound(row, col) {
        return !(row < 0 || row >= this.rows || col < 0 || col >= this.cols);
    }
}

const birthThreshold = 3
const deathThreshold = 1
class GameOfLife {
    constructor(grid) {
        this.grid = grid;
        this.init = false;
    }

    setActive(row, col, isActive) {
        this.grid.setCell(row, col, isActive);
    }

    tick() {
        for (let cell of this.grid.cells()) {
            (cell.value) ? this.checkActiveCell(cell.row, cell.col) : this.checkDeadCell(cell.row, cell.col);
        }
    }

    getAliveNeighbourCount(row, col) {
        return this.grid.neighbourCountWithPredicate(row, col, cell => cell);
    }

    checkDeadCell(row, col) {
        if (this.getAliveNeighbourCount(row, col) >= birthThreshold) {
            this.setActive(row, col, true);
        }
    }

    checkActiveCell(row, col) {
        if (this.getAliveNeighbourCount(row, col)  <= deathThreshold) {
            this.setActive(row, col, false);
        }
    }
}

export { GameOfLife, Grid }