import logo from './logo.svg';
import './App.css';
import Game from './components/Game';
import TitleBanner from './components/TitleBanner';
import PopupMenu from './components/PopupMenu';

function App() {
  return (
    <div className="App">
      <TitleBanner title="Maru Game of Life" subtitle="A simulator for the famous Conway's Game of Life"/>
      <Game/>
    </div>
  );
}

export default App;
