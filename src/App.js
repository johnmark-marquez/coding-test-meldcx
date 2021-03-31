import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';

// Import Components
import LoginForm from './components/Login/LoginForm';
import Devices from './components/Devices/Devices';
import useToken from './components/App/useToken';
import LogStorage from './components/App/loginStorage';

function App() {
  const { setToken } = useToken();
  const { isLog, setLog } = LogStorage();

  // If isLog false, user is redirected to login
  const handleLogin = (isLog) => setLog(isLog);
  return (
      <BrowserRouter>
        <Switch>
          { (isLog) ?  <Route path="/devices" render={() => <Devices handleLogin={handleLogin}/>}/> : <Route path="/"
            render={() => <div className="App"><LoginForm setToken={setToken} handleLogin={handleLogin}/></div>}/> 
         }
        </Switch>
      </BrowserRouter>
  );
}

export default App;
