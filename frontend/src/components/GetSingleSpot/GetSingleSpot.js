import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllReviews } from '../../store/reviews';
import { actionGetOneSpot } from '../../store/spots';
import SpotReviews from '../Reviews/SpotReviews';
import './GetSingleSpot.css'
import aircover from './aircover.png';
import countertop from './countertops.png';
import badge from './badge.png';
import key from './key.png';

const DisplaySingleSpot = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);

    const oneSpot = useSelector(state => state.spots.singleSpot);
    // console.log(spotId, `~~~~~~~~~~~~~~~~spotId~~~~~~~~~~~~~~~~~~`);

    // const { spot } = useParams();
    // console.log(spot, '------------------------spot----------------'); //undefined

    // const oneSpot = useSelector(state => state.singleSpot)
    // const oneSpot = useSelector(state => { if (state.spot.singleSpot) return state.spots.singleSpot });
    // console.log(`-------~~~~~------------~~~spot from spot detail component~---------~~`, oneSpot)

    useEffect(() => {
        dispatch(actionGetOneSpot(spotId))
            .then(() => dispatch(getAllReviews()))
            .then(() => setIsLoaded(true))
    }, [dispatch, spotId])


    if (!oneSpot?.SpotImages?.length) {
        return 'Spot does not exist.'
    } else {
        return isLoaded && (
            <div key='root'>
                <div className='single-spotDetails'>
                    <h1>{oneSpot.name}  ${oneSpot.price} night
                        <p>
                            <i>★</i>
                            &nbsp;
                            {oneSpot.avgStarRating > 0 ? oneSpot.avgStarRating.toString().slice(0, 4) : 'New'}
                            &nbsp;
                            Hosted by {oneSpot.Owner.firstName} {oneSpot.Owner.lastName}
                        </p>
                    </h1>
                    <img className='singleSpotImage' key={oneSpot.SpotImages[0].url} src={oneSpot.SpotImages[0].url} alt={'Not a proper url'} />
                    <div className='singleSpotAddress'>{oneSpot.address}, {oneSpot.city}, {oneSpot.state} {oneSpot.country}</div>
                    <br></br>

                    <div className='descriptionWrapper'>
                        <div className='singleSpotHeadline'>About this location:</div>
                        <div className='description'>{oneSpot.description} </div>
                    </div>

                    <div className='singleSpotLnBr'></div>

                    <div className='singleSpotInfo'>
                        <img className='badges' src={countertop} />
                        <div>
                            <div className='singleSpotHeadline'>Dedicated workspace.</div>
                            <div className='singleSpotDescription'>A private room with WiFi that's well suited for working.</div>
                        </div>
                    </div>
                    <div className='singleSpotInfo'>
                        <img className='badges' src={badge} />
                        <div>
                            <div className='singleSpotHeadline'>{oneSpot.Owner.firstName} is a Superhost</div>
                            <div className='singleSpotDescription'>{oneSpot.Owner.firstName} provides 24/7 assistance regarding this location.</div>
                        </div>
                    </div>
                    <div className='singleSpotInfo'>
                        <img className='badges' src={key} />
                        <div>
                            <div className='singleSpotHeadline'>Great check-in experience</div>
                            <div className='singleSpotDescription'>100% of recent guests gave the check-in process a 5-Star rating!</div>
                        </div>
                    </div>

                    <div className='singleSpotLnBr'></div>

                    <div>
                        <img src={aircover} />
                        <div className='aircoverDescription'>Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues including trouble checking in.</div>
                    </div>

                    <div className='singleSpotLnBr'></div>

                    <div>
                        <div className='reviewsHeadline'>Reviews</div>
                        <SpotReviews />
                    </div>
                </div>
            </div>
        )
    }
}

export default DisplaySingleSpot;