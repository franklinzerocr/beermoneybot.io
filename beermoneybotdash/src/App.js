import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from './components/Login.js';
import Dashboard from './components/Dashboard.js';
import './App.css';
import useToken from './authenticate/useToken.js';



function App() {
  const { token, setToken } = useToken();

  if(!token) {
   return <Login setToken={setToken} />
 }
  return (
    <BrowserRouter>
              <Switch>
                  <Route exact path="/" component={Dashboard} />
              </Switch>
          </BrowserRouter>
  );
}

export default App;
