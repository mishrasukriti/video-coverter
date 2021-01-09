import logo from './logo.svg';
import './App.css';

import { VideoSelectScreen } from "./screens/VideoSelectScreen";
import { Convert } from "./components/Convert";

function App() {
  return (
    <div className="App">
      <h1>Video Convertor App</h1>
      <VideoSelectScreen/>
      <Convert/>
    </div>
  );
}

export default App;
