import React, { FC } from 'react';
import Cell from './Cell';
import './Game.css';
import { useGameSelector } from '../../../domain/game/store/hooks';
import GameFunctions from './GameFunctions';
import { gridSizeSelector } from '../../../domain/game/store/selectors';

/**
 * React component representing the main Game of Life simulation
 * @returns JSX
 */
const Game : FC = () => {
    const {rows, cols} = useGameSelector(gridSizeSelector);
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