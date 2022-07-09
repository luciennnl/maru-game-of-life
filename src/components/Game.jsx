import { createContext, useEffect, useState } from 'react';
import Cell from './Cell';
import './Game.css';
import { GameOfLife, Grid } from './GameOfLife';

const rows = 75;
const cols = 100;

const GameContext = createContext(null);

function Game() {
    const [gameState, setGameState] = useState(new GameOfLife(new Grid(rows, cols, false)));
    
    const tick = () => {
        setGameState(prev => {
            prev.tick()
            return prev;
        });
    }

    useEffect(() => {
        setInterval(tick, 200);
    }, []);
    
    return <GameContext.Provider value={ gameState.grid }>
        <section id='game-main' style={{
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gridTemplateColumns: `repeat(${cols}, 1fr)`
        }}>
            { new Array(rows * cols).fill().map((val, idx) => <Cell key={idx}/>) }
        </section>
    </GameContext.Provider>
}

export default Game;

export { GameContext };