import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import { CellStatus } from '../../../domain/GameOfLife';
import { GameContext } from './Game';
import './Cell.css';

interface CellProps {
    row: number;
    col: number;
}

const Cell:FC<CellProps> = (props) => {
    const [status, setStatus] = useState<CellStatus>(CellStatus.DEAD);
    const gameContext = useContext(GameContext);
    const firstLoad = useRef<boolean>(true);

    const setStatusWrapper = (value: CellStatus) : void => {
        firstLoad.current = false;
        setStatus(value);
    }

    const onClick = () => {
        let newStatus = status === CellStatus.ALIVE ? CellStatus.DEAD : CellStatus.ALIVE;
        if (gameContext === null) {
            return;
        }

        let grid = gameContext.game.grid;
        grid.setCell(grid.getCell(props.row, props.col), newStatus);

        setStatusWrapper(newStatus);
    }

    useEffect(() => {
        gameContext !== null && setStatus(gameContext.game.grid.getCell(props.row, props.col).value)
    }, [gameContext, props.row, props.col]);
    
    return <div className={`cell pointer ${ status === CellStatus.ALIVE ? "cell-alive" : firstLoad.current ? "" : "cell-exit"}`} onClick={onClick} >

    </div>
}

export default Cell;