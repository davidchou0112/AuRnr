import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import { getAllSpots } from '../store/session';

const DisplayAllSpots = () => {
    const dispatch = useDispatch();

    const { spotId } = useParams();
    const spot = useSelector(state => {
        return state.spot.spots.map(spotId => state.spot[spotId]);
    });

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch]);

    if (!spot) {
        return null;
    }


};
export default DisplayAllSpots;
