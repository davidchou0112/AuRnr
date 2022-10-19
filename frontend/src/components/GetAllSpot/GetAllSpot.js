import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { NavLink, Route, useParams } from 'react-router-dom';
import { getAllSpots } from '../../store/spots';

import './GetAllSpot.css'

const DisplayAllSpots = () => {
    const dispatch = useDispatch();

    const spot = useSelector(state => state.spots)

    // console.log(spot, '==============this is spot==============')

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch]);

    if (!spot) {
        return null
    } else {
        return (
            <>
                {Object.values(spot).map(spotId => (
                    <div>
                        <div>
                            <img className='spotImage' key={spotId.previewImage} src={spotId.previewImage} alt={'Your stay is loading...'} />
                            <div key={spotId.address}>{spotId.address}
                                <div key={spotId.avgRating}>{spotId.avgRating}
                                    <div key={spotId.city}>{spotId.city}
                                        <div key={spotId.country}>{spotId.country}
                                            <div key={spotId.description}>{spotId.description}
                                                <div key={spotId.price}>{spotId.price}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </>
        )
    }
};

export default DisplayAllSpots;
