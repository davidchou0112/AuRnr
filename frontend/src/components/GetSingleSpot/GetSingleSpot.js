import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { actionGetOneSpot } from '../../store/spots';
import './GetSingleSpot.css'

const DisplaySingleSpot = () => {
    const dispatch = useDispatch();

    const { spotId } = useParams();
    console.log(spotId, `~~~~~~~~~~~~~~~~spotId~~~~~~~~~~~~~~~~~~`);

    // const { spot } = useParams();
    // console.log(spot, '------------------------spot----------------'); //undefined


    const oneSpot = useSelector(state => state.spots.singleSpot)
    console.log(oneSpot, '~~~~~~~~~~~~~~~~~~oneSpot~~~~~~~~~')


    useEffect(() => {
        dispatch(actionGetOneSpot(spotId))
    }, [dispatch, spotId])

    return (
        <div>
            <h1>
                why are my oneSpot undefined...............
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
        </div>
    )
}
export default DisplaySingleSpot;