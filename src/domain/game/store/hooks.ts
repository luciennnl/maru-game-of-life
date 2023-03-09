import {
    TypedUseSelectorHook,
    useDispatch,
    useSelector
} from 'react-redux';
import type {
    RootState,
    GameDispatch
} from './gameStore';

/**
 * Typed useDispatch for the GameStore
 */
export const useGameDispatch: () => GameDispatch = useDispatch;

/**
 * Typed useSelector for the GameStore
 */
export const useGameSelector: TypedUseSelectorHook < RootState > = useSelector;