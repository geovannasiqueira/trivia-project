import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import './App.css';
import Login from './pages/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';
import NotFound from './pages/NotFound';


export default function App() {
  return (
    <div >
      <header>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/game" component={ Game } />
          <Route path="/settings" component={ Settings } />
          <Route path="/feedback" component={ Feedback } />
          <Route path="/ranking" component={ Ranking } />
          <Route component={ NotFound } />
        </Switch>
      </header>
    </div>
  );
}
