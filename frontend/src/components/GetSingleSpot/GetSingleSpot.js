import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { actionGetOneSpot } from '../../store/spots';
import './GetSingleSpot.css'

const DisplaySingleSpot = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    console.log(spotId, `~~~~~~~~~~~~~~~~spotId~~~~~~~~~~~~~~~~~~`);
    const spot = useSelector(state => state.spots)
    console.log(spot, '~~~~~~~~~~~~~~~~~~spot~~~~~~~~~')

    useEffect((spotId) => {
        dispatch(actionGetOneSpot(spotId))
    }, [dispatch, spotId])

    return (
        <div>
            <p>
                ???????????????

                {/* <div className='single-spot-div'>
                    <img className='single-spotImage' key={spotId.previewImage} src={spotId.previewImage} alt={'Your stay is loading...'} />
                    <div className='single-spotDetails'>
                        <p key={spotId.address}>{spotId.address} </p>
                        <p key={spotId.avgRating}>{spotId.avgRating} </p>
                        <p key={spotId.city}>{spotId.city} </p>
                        <p key={spotId.country}>{spotId.country} </p>
                        <p key={spotId.description}>{spotId.description} </p>
                        <p key={spotId.price}>{spotId.price} </p>
                    </div>
                </div> */}

            </p>
        </div>
    )
}
export default DisplaySingleSpot;