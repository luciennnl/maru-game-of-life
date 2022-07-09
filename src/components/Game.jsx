import { useState } from 'react';
import Cell from './Cell';
import './Game.css';
const defaultRows = 75;
const defaultCols = 100;
function Game() {
    const [rows, setRows] = useState(defaultRows);
    const [cols, setCols] = useState(defaultCols);
    return <section id='game-main' style={{
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gridTemplateColumns: `repeat(${cols}, 1fr)`
    }}>
        { new Array(rows * cols).fill().map(() => <Cell/>) }
    </section>
}

export default Game;