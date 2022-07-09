import { useContext, useEffect, useState } from 'react';
import './Cell.css';
import { GameContext } from './Game';

function Cell({ row, col }) {
    const [active, setActive] = useState(false);
    const gameContext = useContext(GameContext)
    useEffect(() => setActive(gameContext.state.grid.getCell(row, col)), [gameContext, row, col]);
    
    const onClick = () => {
        if (gameContext.init) {
            return;
        }
        setActive(status => !status);
    }
    return <div className={`cell ${ active ? "cell-active" : ""}`} onClick={onClick} >

    </div>
}

export default Cell;