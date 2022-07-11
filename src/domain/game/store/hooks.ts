import {
    TypedUseSelectorHook,
    useDispatch,
    useSelector
} from 'react-redux';
import type {
    RootState,
    GameDispatch
} from './gameStore';

export const useGameDispatch: () => GameDispatch = useDispatch;
export const useGameSelector: TypedUseSelectorHook < RootState > = useSelector;