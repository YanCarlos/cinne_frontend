import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MovieList from './MovieList';

function Yield() {
  return (
    <div className="yield">
      <Switch>
        <Route path="/reservas">
          Reservas
        </Route>
        <Route path="/">
          <MovieList />
        </Route>
      </Switch>
    </div>
  )
}
export default Yield;
