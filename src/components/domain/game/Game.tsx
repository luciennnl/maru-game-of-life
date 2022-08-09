import React, { useRef, FC } from 'react';
import Cell from './Cell';
import './Game.css';
import { GameStatus } from '../../../domain/game/gameOfLife';
import PopupMenu from '../../structural/popupMenu/PopupMenu';
import ButtonList from '../../structural/buttons/ButtonList';
import { ButtonProps, ButtonStyle } from '../../structural/buttons/Button';
import { useMemo } from 'react';
import { useGameDispatch, useGameSelector } from '../../../domain/game/store/hooks';

const TICKS_PER_SECOND = 2;
const Game : FC = () => {
    const gameStatus = useGameSelector(state => state.gameStatus);
    const gameState = useGameSelector(state => state.gameState);
    const dispatch = useGameDispatch();
    const gameTick = useRef<number | undefined>(undefined);

    const functions = useMemo<ButtonProps[]>(() => {
        const tick = () => {
            dispatch({ type: 'tick' });
        }
        return [
        gameStatus === GameStatus.STOPPED ? {
            callback: () => {
                gameTick.current = window.setInterval(tick, 1000 / TICKS_PER_SECOND);
                dispatch({ type: 'start' });
            },
            name: 'Start'
        } : {
            callback: () => {
                clearInterval(gameTick.current);
                dispatch({ type: 'stop' });
            },
            name: 'Stop'
        },
        {
            callback: () => {
                clearInterval(gameTick.current);
                dispatch({ type: 'reset' });
                dispatch({ type: 'stop' });
            },
            name: 'Reset',
            style: ButtonStyle.LIGHT
        }
    ]}, [gameStatus, dispatch]);

    let {rows, cols} = gameState.grid.gridSize;
    
    return <>
        <section 
            id='game-main' 
            style={{
                gridTemplateRows: `repeat(${rows}, 1fr)`,
                gridTemplateColumns: `repeat(${cols}, 1fr)`
            }}
        >
            { new Array(rows * cols).fill(undefined).map((val, idx) => 
                <Cell 
                    row={ Math.floor(idx / cols) } 
                    col={ idx % cols } 
                    key={ idx }
                />) 
            }
        </section>
        <PopupMenu>
            <ButtonList 
                buttons={ functions }/>
        </PopupMenu>
    </>
}

export default Game;