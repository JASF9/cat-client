import React from 'react';
import Auth from './components/Auth';
import Galery from './components/galery/Galery';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  
  return (
    <Router>
      <div>
      <Switch>
        <Route path="/galery">
          <Galery />
        </Route>
        <Route path="/">
          <Auth />
        </Route>
      </Switch>
      </div>
    </Router>
  );
}

export default App;
