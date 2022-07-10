import React, { createContext, useRef, useState, FC } from 'react';
import Cell from './Cell';
import './Game.css';
import { GameOfLife } from '../../../domain/GameOfLife';
import PopupMenu from '../../structural/popupMenu/PopupMenu';
import ButtonList from '../../structural/buttons/ButtonList';
import { ButtonStyle } from '../../structural/buttons/Button';

enum GameStatus {
    STARTED,
    STOPPED
}

interface GameContextStructure {
    game: GameOfLife;
    status: GameStatus;
}

const GameContext = createContext<GameContextStructure | null>(null);

const Game : FC = () => {
    const [gameContext, setGameContext] = useState({ game: new GameOfLife(), status: GameStatus.STOPPED });
    const gameTick = useRef<number | undefined>(undefined);

    const tick = () => {
        setGameContext(prev => {
            prev.game.tick()
            return { ...prev };
        });
    }

    const functions = [
        gameContext.status === GameStatus.STOPPED ? {
            callback: () => {
                gameTick.current = window.setInterval(tick, 500);
                setGameContext(prev => {
                    prev.status = GameStatus.STARTED;
                    return { ...prev };
                });
            },
            name: 'Start'
        } : {
            callback: () => {
                clearInterval(gameTick.current);
                setGameContext(prev => {
                    prev.status = GameStatus.STOPPED;
                    return { ...prev };
                });
            },
            name: 'Stop'
        },
        {
            callback: () => {
                setGameContext(prev => {
                    prev.status = GameStatus.STOPPED;
                    prev.game.grid.resetGrid();
                    return { ...prev };
                })
            },
            name: 'Reset',
            style: ButtonStyle.LIGHT
        }
    ]
    let {rows, cols} = gameContext.game.grid.gridSize;
    return <GameContext.Provider value={ gameContext }>
        <section id='game-main' style={{
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gridTemplateColumns: `repeat(${cols}, 1fr)`
        }}>
            { new Array(rows * cols).fill(undefined).map((val, idx) => <Cell row={ Math.floor(idx / cols) } col={ idx % cols } key={idx}/>) }
        </section>
        <PopupMenu>
            <ButtonList buttons={functions}/>
        </PopupMenu>
    </GameContext.Provider>
}

export default Game;

export { GameContext, GameStatus };