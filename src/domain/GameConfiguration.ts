const DEFAULT_GAME_MAP_SIZE_ROWS = '36';
const DEFAULT_GAME_MAP_SIZE_COLS = '64';

const config = {
    gameMapSize: {
        rows: parseInt(process.env.REACT_APP_GAME_MAP_SIZE_ROWS || DEFAULT_GAME_MAP_SIZE_ROWS),
        cols: parseInt(process.env.REACT_APP_GAME_MAP_SIZE_COLS || DEFAULT_GAME_MAP_SIZE_COLS)
    }
};

export default config;