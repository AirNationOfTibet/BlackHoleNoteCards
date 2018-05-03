import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import UserPage from './components/UserPage/UserPage.js';
import DeckBuilder from './components/DeckBuilder/DeckBuilder.js';

import './styles/main.css';

const App = () => (
  <div>
    <Header title="Black Hole Notecards" />
    <Router>
      <Switch>
        <Redirect exact from="/" to="/mycollection" />
        <Route
          path="/home"
          component={LoginPage}
        />
        <Route
          path="/register"
          component={RegisterPage}
        />
        <Route
          path="/mycollection"
          component={UserPage}
        />
        <Route
          path="/createcard"
          component={DeckBuilder}
        />
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404: This page does not exist</h1>} />

      </Switch>
    </Router>
  </div>
);

export default App;
