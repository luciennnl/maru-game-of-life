import React, { FC, useMemo, useRef } from "react";
import { GameStatus } from "../../../domain/game/gameOfLife";
import { useGameDispatch, useGameSelector } from "../../../domain/game/store/hooks";
import { ButtonProps, ButtonStyle } from "../../structural/buttons/Button";
import ButtonList from "../../structural/buttons/ButtonList";
import PopupMenu from "../../structural/popupMenu/PopupMenu";

/**
 * Constant representing how many times the game should update per second
 */
const TICKS_PER_SECOND = 2;

/**
 * React component representing the game menu for controlling the simulation
 * @returns JSX
 */
const GameFunctions : FC = () => {
    const gameStatus = useGameSelector(state => state.gameStatus);
    const gameTick = useRef<number | undefined>(undefined);
    const dispatch = useGameDispatch();

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

    return <PopupMenu>
        <ButtonList 
            buttons={ functions }/>
    </PopupMenu>
}

export default GameFunctions;