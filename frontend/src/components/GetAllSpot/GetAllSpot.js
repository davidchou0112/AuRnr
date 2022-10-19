import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { NavLink, Route, useParams } from 'react-router-dom';
import { getAllSpots } from '../../store/spots';

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
                    <ul>
                        <img key={spotId.previewImage} src={spotId.previewImage} alt={'Your stay is loading...'} />
                        <li key={spotId.address}>{spotId.address}</li>
                        <li key={spotId.avgRating}>{spotId.avgRating}</li>
                        <li key={spotId.city}>{spotId.city}</li>
                        <li key={spotId.country}>{spotId.country}</li>
                        <li key={spotId.description}>{spotId.description}</li>
                        <li key={spotId.price}>{spotId.price}</li>
                    </ul>
                ))}
            </>
        )
    }
};

export default DisplayAllSpots;
