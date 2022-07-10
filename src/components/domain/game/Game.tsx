import React, { createContext, useRef, useState, FC } from 'react';
import Cell from './Cell';
import './Game.css';
import GameOfLife from '../../../domain/game/gameOfLife';
import PopupMenu from '../../structural/popupMenu/PopupMenu';
import ButtonList from '../../structural/buttons/ButtonList';
import { ButtonProps, ButtonStyle } from '../../structural/buttons/Button';
import { useMemo } from 'react';

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
    const [gameContext, setGameContext] = useState<GameContextStructure>({ game: new GameOfLife(), status: GameStatus.STOPPED });
    const gameTick = useRef<number | undefined>(undefined);
    const changeGameStatus = (newStatus : GameStatus) => {
        setGameContext(prev => {
            prev.status = newStatus;
            return { ...prev };
        });
    }
    const functions = useMemo<ButtonProps[]>(() => [
        gameContext.status === GameStatus.STOPPED ? {
            callback: () => {
                gameTick.current = window.setInterval(tick, 500);
                changeGameStatus(GameStatus.STARTED);
            },
            name: 'Start'
        } : {
            callback: () => {
                clearInterval(gameTick.current);
                changeGameStatus(GameStatus.STOPPED);
            },
            name: 'Stop'
        },
        {
            callback: () => {
                gameContext.game.grid.resetGrid();
                changeGameStatus(GameStatus.STOPPED);
            },
            name: 'Reset',
            style: ButtonStyle.LIGHT
        }
    ], [gameContext.status]);

    const tick = () => {
        setGameContext(prev => {
            prev.game.tick()
            return { ...prev };
        });
    }

    let {rows, cols} = gameContext.game.grid.gridSize;
    
    return <GameContext.Provider 
                value={ gameContext }>
        <section 
            id='game-main' 
            style={{
                gridTemplateRows: `repeat(${rows}, 1fr)`,
                gridTemplateColumns: `repeat(${cols}, 1fr)`
        }}>
            { new Array(rows * cols).fill(undefined).map((val, idx) => 
                <Cell 
                    row={ Math.floor(idx / cols) } 
                    col={ idx % cols } 
                    key={idx}/>) }
        </section>
        <PopupMenu>
            <ButtonList 
                buttons={functions}/>
        </PopupMenu>
    </GameContext.Provider>
}

export default Game;

export { GameContext, GameStatus };