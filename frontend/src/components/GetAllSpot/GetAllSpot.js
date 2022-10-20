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
        return (
            <>
                {Object.values(allSpot).map(spotId => (

                    <div className='allSpot-div'>
                        <NavLink className='singleSpots-nav' to={`spots/${spotId}`}>
                            <img className='spotImage' key={spotId.previewImage} src={spotId.previewImage} alt='Your stay is loading...' />
                            <div className='spotDetails'>
                                <p key={spotId.address}>{spotId.address} </p>
                                <p key={spotId.avgRating}>{spotId.avgRating} </p>
                                <p key={spotId.city}>{spotId.city} </p>
                                <p key={spotId.country}>{spotId.country} </p>
                                <p key={spotId.description}>{spotId.description} </p>
                                <p key={spotId.price}>{spotId.price} </p>
                            </div>
                        </NavLink>
                    </div>

                ))}
            </>
        )
    }
};

export default DisplayAllSpots;
