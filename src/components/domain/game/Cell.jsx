import { useContext, useEffect, useRef, useState } from 'react';
import './Cell.css';
import { GameContext } from './Game';

function Cell({ row, col }) {
    const [active, setActive] = useState(false);
    const gameContext = useContext(GameContext);
    const firstLoad = useRef(true);

    const setActiveWrapper = (value) => {
        firstLoad.current = false;
        setActive(value);
    }

    useEffect(() => setActive(gameContext.state.grid.getCell(row, col)), [gameContext, row, col]);
    
    const onClick = () => {
        let status = active;
        if (gameContext.init) {
            return;
        }
        setActiveWrapper(!status);
        gameContext.state.grid.setCell(row, col, !status);
    }
    return <div className={`cell pointer ${ active ? "cell-active" : firstLoad.current ? "" : "cell-exit"}`} onClick={onClick} >

    </div>
}

export default Cell;