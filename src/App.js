import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import history from './history';
import './App.css';
import { EntryScreen } from "./screens/EntryScreen";
import { VideoSelectScreen } from "./screens/VideoSelectScreen";
import { EmptyFolderSelectScreen } from "./screens/EmptyFolderSelectScreen";

function App() {
  const [outputPath, setOutputPath] = useState('');

  return (
    <div className="App">
      <Router history={history} >
        <Switch>

          <Route exact path="/">
            <EntryScreen  />
          </Route>

          <Route exact path="/emptyFolderSelect">
            <EmptyFolderSelectScreen outputPath={outputPath} setOutputPath={setOutputPath}/>
          </Route>

          <Route exact path="/videoSelect">
            <VideoSelectScreen outputPath={outputPath} setOutputPath={setOutputPath}/>
          </Route>

        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
