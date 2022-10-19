// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

import DisplayAllSpots from './components/GetAllSpot/GetAllSpot';
import DisplaySingleSpot from "./components/GetSingleSpot/GetSingleSpot";
// import CreateSpotForm from "./components/CreateSpotFormModal/CreateSpotForm";
import CreateSpotFormModal from "./components/CreateSpotFormModal";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <Switch>

        <Route exact path={['/api/spots/', '/spots/', '/', 'api/']}>
          <DisplayAllSpots />
        </Route>


        <Route exact path={['/api/spots/:spotId', '/spots/:spotId', '/:spotId']}>
          <DisplaySingleSpot />
        </Route>

        <Route exact path='/spots/create'>
          <CreateSpotFormModal />
        </Route>

      </Switch>
    </>
  );
}

export default App;