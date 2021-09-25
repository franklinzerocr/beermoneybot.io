import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from './components/Login.js';
import Dashboard from './components/Dashboard.js';
import './App.css';

function App() {
  return (
    <BrowserRouter>
              <Switch>
                  <Route exact path="/login" component={Login} />
                  <Route path="/" component={Dashboard} />
              </Switch>
          </BrowserRouter>
  );
}

export default App;
