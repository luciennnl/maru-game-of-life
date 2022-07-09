import './App.css';
import Game from './components/domain/game/Game';
import TitleBanner from './components/structural/titleBanner/TitleBanner';

function App() {
  return (
    <div className="App">
      <TitleBanner title="Maru Game of Life" subtitle="A simulator for the famous Conway's Game of Life"/>
      <Game/>
    </div>
  );
}

export default App;
