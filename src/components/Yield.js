import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { MoviesList } from './movie/index';
import { BookingsList } from './booking/index';

function Yield() {
  return (
    <div className="yield">
      <Switch>
        <Route path="/reservas">
          <BookingsList />
        </Route>
        <Route path="/">
          <MoviesList />
        </Route>
      </Switch>
    </div>
  )
}
export default Yield;
