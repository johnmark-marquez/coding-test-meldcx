import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

// Import Components
import LoginForm from './components/Login/LoginForm';
import Devices from './components/Devices/Devices';
import useToken from './components/App/useToken';

function App() {
  const { token, setToken } = useToken();

  // If token does not exist, user is redirected to the login form
  // TODO: Add error handler
  if (!token) {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/">
              <LoginForm setToken={setToken}/>
            </Route>
            <Route path="/devices">
              <Devices/>
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
  // Return if token is found
  return (
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <Devices/>
          </Route>
          <Route path="/login">
            <LoginForm setToken={setToken}/>
          </Route>
        </Switch>
      </BrowserRouter>
  );
  
}

export default App;
