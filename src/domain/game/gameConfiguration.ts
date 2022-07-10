const DEFAULT_GAME_MAP_SIZE_ROWS = '36';
const DEFAULT_GAME_MAP_SIZE_COLS = '64';

const config = {
    gameMapSize: {
        rows: parseInt(process.env.REACT_APP_GAME_MAP_SIZE_ROWS || DEFAULT_GAME_MAP_SIZE_ROWS),
        cols: parseInt(process.env.REACT_APP_GAME_MAP_SIZE_COLS || DEFAULT_GAME_MAP_SIZE_COLS)
    },

    tutorialGuideBoxes: [{
            key: 'tb0',
            left: '15%',
            top: '20%',
            text: 'Welcome to Maru Game of Life! This is a short tutorial, click here to continue...'
        },
        {
            key: 'tb1',
            left: '30%',
            top: '20%',
            text: '\u2190'.concat(' Click on the cells to turn them alive')
        },
        {
            key: 'tb2',
            left: '52%',
            top: 'calc(100% - 85px)',
            text: '\u2190'.concat(' Click on the triangle to open up the menu')
        },
        {
            key: 'tb3',
            left: 'calc(50% - 3.5rem)',
            top: '50%',
            text: 'Have fun! :))'
        }

    ]
};

export default config;