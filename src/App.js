import React, { useContext } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/login';
import Header from './components/header';
import Movie from './pages/movie';
import Actor from './pages/actor';
import Context from './store/context';

function App() {

  const ctx = useContext(Context);

  return (
    <React.Fragment>
        <Header />
        <Switch>
          {!ctx.isLoggedIn && (
            <Route path='/' exact>
              <Login />
            </Route>
          )}

          <Route path='/movie'>
            {ctx.isLoggedIn &&(
              <Movie />
            )}
            {!ctx.isLoggedIn && (
              <Redirect to='/' />
            )}
          </Route>

          <Route path='/actor'>
            {ctx.isLoggedIn &&(
              <Actor />
            )}
            {!ctx.isLoggedIn && (
              <Redirect to='/' />
            )}  
          </Route>

          <Route path='*'>
            <Redirect to='/' />
          </Route>
        </Switch>
    </ React.Fragment>
   
  );
}

export default App;
