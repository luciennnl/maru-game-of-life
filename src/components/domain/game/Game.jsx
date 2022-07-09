import { createContext, useRef, useState } from 'react';
import Cell from './Cell';
import './Game.css';
import { GameOfLife, Grid } from '../../../domain/GameOfLife';
import PopupMenu from '../../structural/popupMenu/PopupMenu';
import ButtonList from '../../structural/buttonList/ButtonList';

const rows = 36;
const cols = 64;

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

    const functions = [
        !gameState.init ? {
            callback: () => {
                gameTick.current = setInterval(tick, 500);
                setGameState(prev => {
                    prev.init = true;
                    return { ...prev };
                });
            },
            name: 'Start'
        } : {
            callback: () => {
                clearInterval(gameTick.current);
                setGameState(prev => {
                    prev.init = false;
                    return { ...prev };
                });
            },
            name: 'Stop'
        },
        {
            callback: () => {
                setGameState(prev => {
                    prev.init = false;
                    prev.state.grid.resetGrid();
                    return { ...prev };
                })
            },
            name: 'Reset'
        }
    ]
    return <GameContext.Provider value={ gameState }>
        <section id='game-main' style={{
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gridTemplateColumns: `repeat(${cols}, 1fr)`
        }}>
            { new Array(rows * cols).fill().map((val, idx) => <Cell row={ Math.floor(idx / cols) } col={ idx % cols } key={idx}/>) }
        </section>
        <PopupMenu functions={functions}>
            <ButtonList functions={functions}/>
        </PopupMenu>
    </GameContext.Provider>
}

export default Game;

export { GameContext };