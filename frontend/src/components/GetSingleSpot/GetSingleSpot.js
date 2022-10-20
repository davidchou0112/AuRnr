import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { actionGetOneSpot } from '../../store/spots';
import './GetSingleSpot.css'

const DisplaySingleSpot = () => {
    const dispatch = useDispatch();

    const { spotId } = useParams();

    // console.log(spotId, `~~~~~~~~~~~~~~~~spotId~~~~~~~~~~~~~~~~~~`);

    // const { spot } = useParams();
    // console.log(spot, '------------------------spot----------------'); //undefined


    // const oneSpot = useSelector(state => state.singleSpot)
    const oneSpot = useSelector(state => state)
    // console.log(oneSpot, '~~~~~~~~~~~~~~~~~~oneSpot~~~~~~~~~')
    // const oneSpot1 = useSelector(state => state.spots)
    // console.log(oneSpot1, '~~~~~~~~~~~~~~~~~~oneSpot1~~~~~~~~~')

    // const oneSpot2 = useSelector(state => state)
    // console.log(oneSpot2, '~~~~~~~~~~~~~~~~~~oneSpot2~~~~~~~~~')

    // console.log(oneSpot.spots.singleSpot, '~~~~!!~~~~~~~~~oneSpot.singleSpot~~~~~~!!!~~~')

    useEffect(() => {
        dispatch(actionGetOneSpot(spotId))
    }, [dispatch, spotId])

    return (
        <div>
            {/* <h1>
                why is my oneSpot undefined...............
            </h1> */}
            <div className='single-spot-div'>
                {/* <img className='single-spotImage' key={oneSpot.spots.singleSpot.SpotImage[0].url} src={oneSpot.spots.singleSpot.SpotImage[0].url} alt={'Your stay is loading...'} /> */}
                <div className='single-spotDetails'>
                    <p key={oneSpot.spots.singleSpot.address}>{oneSpot.spots.singleSpot.address} </p>
                    <p key={oneSpot.spots.singleSpot.avgRating}>{oneSpot.spots.singleSpot.avgRating} </p>
                    <p key={oneSpot.spots.singleSpot.city}>{oneSpot.spots.singleSpot.city} </p>
                    <p key={oneSpot.spots.singleSpot.country}>{oneSpot.spots.singleSpot.country} </p>
                    <p key={oneSpot.spots.singleSpot.description}>{oneSpot.spots.singleSpot.description} </p>
                    <p key={oneSpot.spots.singleSpot.price}>{oneSpot.spots.singleSpot.price} </p>
                </div>
            </div>
        </div>
    )
}
export default DisplaySingleSpot;