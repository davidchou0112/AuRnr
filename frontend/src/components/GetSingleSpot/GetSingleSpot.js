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


    // const oneSpot = useSelector(state => state.singleSpot)
    const oneSpot = useSelector(state => state.spots.singleSpot)
    console.log(oneSpot, '~~~~~~~~~~~~~~~~~~oneSpot~~~~~~~~~')
    console.log(oneSpot.SpotImages, `~~~~~~~~~~~~~~~~~~~~~~~~~~~this is~~~~~~~~~`)
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
                <img className='single-spotImage' key={oneSpot.SpotImages[0].url} src={oneSpot.SpotImages[0].url} alt={'Your stay is loading...'} />
                <div className='single-spotDetails'>
                    <p key={oneSpot.address}>{oneSpot.address} </p>
                    <p key={oneSpot.avgRating}>{oneSpot.avgRating} </p>
                    <p key={oneSpot.city}>{oneSpot.city} </p>
                    <p key={oneSpot.country}>{oneSpot.country} </p>
                    <p key={oneSpot.description}>{oneSpot.description} </p>
                    <p key={oneSpot.price}>{oneSpot.price} </p>
                </div>
            </div>
        </div>
    )
}
export default DisplaySingleSpot;