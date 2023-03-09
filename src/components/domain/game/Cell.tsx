import React, { FC, useRef } from 'react';
import { CellStatus } from '../../../domain/game/gameOfLife';
import './Cell.css';
import { useGameDispatch, useGameSelector } from '../../../domain/game/store/hooks';

/**
 * Props for the Cell component
 */
interface CellProps {
    row: number;
    col: number;
}

/**
 * React representing a cell in the main grid map of the game
 * @param props CellProps
 * @returns JSX
 */
const Cell:FC<CellProps> = (props) => {
    const dispatch = useGameDispatch();
    const status = useGameSelector(state => state.gameState.grid.getValue(props.row, props.col));
    const firstLoad = useRef<boolean>(true);
    
    const onClick = () => {
        let newStatus = status === CellStatus.ALIVE ? CellStatus.DEAD : CellStatus.ALIVE;

        dispatch({
            type: 'changecell', 
            row: props.row,
            col: props.col, 
            value: newStatus
        });

        firstLoad.current = false;
    }
    
    return <div 
        className={`cell pointer ${ status === CellStatus.ALIVE ? 
            "cell-alive" : firstLoad.current ? 
                "" : "cell-exit"}`} 
        onClick={onClick}
    />
}

export default Cell;