import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllSpots } from '../../store/spots';

import './GetAllSpot.css'

const DisplayAllSpots = () => {
    const dispatch = useDispatch();

    const allSpot = useSelector(state => state.spots.allSpots)

    console.log(allSpot, '==============this is allSpot==============')

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch]);

    if (!allSpot) {
        return null
    } else {
        // the map is now maping through id, it was originally maping through object. it was never desconstructing it (now it is)
        return (
            <>
                {Object.values(allSpot).map(spot => (

                    <div className='allSpot-div'>
                        <NavLink className='singleSpots-nav' to={`spots/${spot.id}`}>
                            <img className='spotImage' key={spot.previewImage} src={spot.previewImage} alt='Your stay is loading...' />
                            <div className='spotDetails'>
                                <p key={spot.address}>{spot.address} </p>
                                <p key={spot.avgRating}>{spot.avgRating} </p>
                                <p key={spot.city}>{spot.city} </p>
                                <p key={spot.country}>{spot.country} </p>
                                <p key={spot.description}>{spot.description} </p>
                                <p key={spot.price}>{spot.price} </p>
                            </div>
                        </NavLink>
                    </div>

                ))}
            </>
        )
    }
};

export default DisplayAllSpots;
