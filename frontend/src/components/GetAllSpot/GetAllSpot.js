import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import { getAllSpots } from '../../store/spots';

const DisplayAllSpots = () => {
    const dispatch = useDispatch();

    const spot = useSelector(state => state.spots)

    // console.log(spot, '==============this is spot==============')

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch]);

    return Object.values(spot).map(spotId => spotId.city);

    // console.log(spot, 'this is spot--------------------------------')

};

export default DisplayAllSpots;
