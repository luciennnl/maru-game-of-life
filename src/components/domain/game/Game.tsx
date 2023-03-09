import React, { FC } from 'react';
import Cell from './Cell';
import './Game.css';
import { useGameSelector } from '../../../domain/game/store/hooks';
import GameFunctions from './GameFunctions';


const Game : FC = () => {
    const {rows, cols} = useGameSelector(state => state.gameState).grid.gridSize;
    
    return <>
        <section 
            id='game-main' 
            style={{
                gridTemplateRows: `repeat(${rows}, 1fr)`,
                gridTemplateColumns: `repeat(${cols}, 1fr)`
            }}
        >
            { new Array(rows * cols).fill(undefined).map((_, idx) => 
                <Cell 
                    row={ Math.floor(idx / cols) } 
                    col={ idx % cols } 
                    key={ idx }
                />) 
            }
        </section>
        <GameFunctions/>
    </>
}

export default Game;