import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllSpots } from '../../store/spots';

import './GetAllSpot.css'

const DisplayAllSpots = () => {
    const dispatch = useDispatch();

    const allSpot = useSelector(state => state.spots.allSpots)

    // console.log(allSpot, '==============this is allSpot==============')

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch]);

    if (!allSpot) {
        return null
    } else {
        // the map is now mapping through id, it was originally mapping through object. it was never deconstructing it (now it is)
        return (
            <div className='allSpotDisplay'>
                {Object.values(allSpot).map(spot => (

                    <div className='allSpot-div'>
                        <NavLink className='singleSpots-nav' to={`spots/${spot.id}`}>
                            <img className='spotImage' key={spot.previewImage} src={spot.previewImage} alt='Not a proper url.' />
                            <div className='locationDescription'>
                                <div>
                                    <div className='name-rating'>{spot.name}
                                        &nbsp;
                                        ★{spot.avgRating > 0 ? Number(spot.avgRating) : 'New'}
                                    </div>
                                </div>

                                <div className='location-price'>
                                    <div key={spot.city}>{spot.city}, {spot.state} </div>
                                    <div key={spot.price}>${spot.price} night </div>
                                </div>

                            </div>
                        </NavLink>
                    </div>

                ))}
            </div>
        )
    }
};

export default DisplayAllSpots;
