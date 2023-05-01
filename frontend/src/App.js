// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';

import DisplayAllSpots from './components/GetAllSpot/GetAllSpot';
import DisplaySingleSpot from './components/GetSingleSpot/GetSingleSpot';
import CreateSpotFormModal from './components/CreateSpotFormModal';
// import EditSpotForm from './components/EditSpot/EditSpot';
import MySpots from './components/UserSpots/UserSpots';
import SpotReviews from './components/Reviews/SpotReviews';
import MyReviews from './components/MyReviews/MyReviews';
import UserBookings from './components/MyBookings/MyBookings';


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>

          <Route exact path='/'>
            <DisplayAllSpots />
          </Route>

          <Route path='/spots/:spotId'>
            <DisplaySingleSpot />
          </Route>

          <Route path='/spots/:spotId/edit'>
            <SpotReviews />
          </Route>

          <Route path='/spots/create'>
            <CreateSpotFormModal />
          </Route>

          <Route path='/current'>
            <MySpots />
          </Route>

          <Route path='/:spotId/reviews'>
            <SpotReviews />
          </Route>

          <Route path='/my-reviews'>
            <MyReviews />
          </Route>

          <Route path='/my-bookings'>
            <UserBookings />
          </Route>

          <Route>
            PageNotFound
          </Route>

        </Switch>
      )}
    </>
  );
}

export default App;