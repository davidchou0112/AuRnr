// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

import DisplayAllSpots from './components/GetAllSpot/GetAllSpot';
import DisplaySingleSpot from "./components/GetSingleSpot/GetSingleSpot";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />

      <Route exact path={['/', '/spots']}>
        <DisplayAllSpots />
      </Route>

      <Switch>

        <Route path='/spots/:spotId'>
          <DisplaySingleSpot />
        </Route>

      </Switch>
    </>
  );
}

export default App;