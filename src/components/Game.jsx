import { createContext, useRef, useState } from 'react';
import Cell from './Cell';
import './Game.css';
import { GameOfLife, Grid } from './GameOfLife';

const rows = 75;
const cols = 100;

const GameContext = createContext(null);

function Game() {
    const [gameState, setGameState] = useState({ init: false, state: new GameOfLife(new Grid(rows, cols, false)) });
    const gameTick = useRef(null);
    const tick = () => {
        setGameState(prev => {
            prev.state.tick()
            return { ...prev };
        });
    }

    const onGameStart = () => {
        gameTick.current = setInterval(tick, 500);
        setGameState(prev => {
            prev.init = true;
            return { ...prev };
        });
    }

    const onGameEnd = () => {
        clearInterval(gameTick.current);
        setGameState(prev => {
            prev.init = false;
            return { ...prev };
        });
    }
    
    return <GameContext.Provider value={ gameState }>
        <section id='game-main' style={{
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gridTemplateColumns: `repeat(${cols}, 1fr)`
        }}>
            { new Array(rows * cols).fill().map((val, idx) => <Cell row={ Math.floor(idx / cols) } col={ idx % cols } key={idx}/>) }
        </section>
        <button className='game-button' onClick={gameState.init ? onGameEnd : onGameStart}>{ gameState.init ? "Stop" : "Start" }</button>
    </GameContext.Provider>
}

export default Game;

export { GameContext };