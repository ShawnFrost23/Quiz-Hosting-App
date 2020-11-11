import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Registration from './pages/Registration';
import Editpage from './pages/Editpage';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/registration">
            <Registration />
          </Route>
          <Route path="/editpage">
            <Editpage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
