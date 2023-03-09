import React, { FC, useEffect, useRef, useState } from 'react';
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
    const [status, setStatus] = useState<CellStatus>(CellStatus.DEAD);
    const dispatch = useGameDispatch();
    const gameState = useGameSelector(state => state.gameState);
    const firstLoad = useRef<boolean>(true);

    const setStatusWrapper = (value: CellStatus) : void => {
        firstLoad.current = false;
        setStatus(value);
    }

    const onClick = () => {
        let newStatus = status === CellStatus.ALIVE ? CellStatus.DEAD : CellStatus.ALIVE;

        let grid = gameState.grid;
        dispatch({
            type: 'changecell', 
            cell: grid.getCell(props.row, props.col), 
            value: newStatus
        });

        setStatusWrapper(newStatus);
    }

    useEffect(() => {
        setStatus(gameState.grid.getCell(props.row, props.col).value)
    }, [gameState, props.row, props.col]);
    
    return <div 
        className={`cell pointer ${ status === CellStatus.ALIVE ? 
            "cell-alive" : firstLoad.current ? 
                "" : "cell-exit"}`} 
        onClick={onClick}
    />
}

export default Cell;