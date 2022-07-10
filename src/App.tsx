import React from 'react';
import Game from './components/domain/game/Game';
import TitleBanner from './components/structural/titleBanner/TitleBanner';
import ContextProvider from './components/util/ContextProvider';
import store from './domain/game/store/gameStore';
import './App.css';
import TutorialOverlay from './components/domain/tutorial/TutorialOverlay';
function App() {
  return (
    <div className="App">
      <TutorialOverlay/>
      <TitleBanner title="Maru Game of Life" subtitle="A simulator for the famous Conway's Game of Life"/>
      <ContextProvider store={store}>
        <Game/>
      </ContextProvider>
    </div>
  );
}

export default App;
