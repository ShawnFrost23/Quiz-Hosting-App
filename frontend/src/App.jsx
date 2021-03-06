import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Registration from './pages/Registration';
import Editpage from './pages/Editpage';
import Editquestion from './pages/EditQuestion';
import PlayerJoin from './pages/PlayerJoin';
import SessionQuestion from './pages/SessionQuestion';

function App() {
  return (
    <Router>
      <>
        <Switch>
          <Route exact path="/" render={() => (<Redirect to="/login" />)} />
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/registration">
            <Registration />
          </Route>
          <Route path="/editpage/:id1">
            <Editpage />
          </Route>
          <Route path="/editquestion/:id1/:id2">
            <Editquestion />
          </Route>
          <Route path="/player">
            <PlayerJoin />
          </Route>
          <Route path="/playsession/:id1">
            <SessionQuestion />
          </Route>
        </Switch>
      </>
    </Router>
  );
}

export default App;
