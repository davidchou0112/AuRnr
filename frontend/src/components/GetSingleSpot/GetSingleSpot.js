import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { actionGetOneSpot } from '../../store/spots';
import './GetSingleSpot.css'

const DisplaySingleSpot = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    console.log(spotId, `~~~~~~~~~~~~~~~~spotId~~~~~~~~~~~~~~~~~~`);
    const spots = useSelector(state => state.spot)
    console.log(spots, '~~~~~~~~~~~~~~~~~~spot~~~~~~~~~')

    useEffect((spotId) => {
        dispatch(actionGetOneSpot(spotId))
    }, [dispatch])

    return (
        <div>
            <p>


                <h1>
                    why are my spots undefined...............
                </h1>
                <div className='single-spot-div'>
                    <img className='single-spotImage' key={spotId.previewImage} src={spotId.previewImage} alt={'Your stay is loading...'} />
                    <div className='single-spotDetails'>
                        <p key={spotId.address}>{spotId.address} </p>
                        <p key={spotId.avgRating}>{spotId.avgRating} </p>
                        <p key={spotId.city}>{spotId.city} </p>
                        <p key={spotId.country}>{spotId.country} </p>
                        <p key={spotId.description}>{spotId.description} </p>
                        <p key={spotId.price}>{spotId.price} </p>
                    </div>
                </div>

            </p>
        </div>
    )
}
export default DisplaySingleSpot;