import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllReviews } from '../../store/reviews';
import { actionGetOneSpot } from '../../store/spots';
import SpotReviews from '../Reviews/SpotReviews';
import './GetSingleSpot.css'

const DisplaySingleSpot = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);

    console.log(spotId, `~~~~~~~~~~~~~~~~spotId~~~~~~~~~~~~~~~~~~`);

    // const { spot } = useParams();
    // console.log(spot, '------------------------spot----------------'); //undefined

    // const oneSpot = useSelector(state => state.singleSpot)
    // const oneSpot = useSelector(state => { if (state.spot.singleSpot) return state.spots.singleSpot });
    const oneSpot = useSelector(state => state.spots.singleSpot);
    console.log(`-------~~~~~------------~~~spot from spot detail component~---------~~`, oneSpot)

    useEffect(() => {
        dispatch(actionGetOneSpot(spotId))
            .then(() => dispatch(getAllReviews()))
            .then(() => setIsLoaded(true))
        // console.log(oneSpot.SpotImages[0].url, `~~~~~~~~~~~~~~~~~~~~~`)
    }, [dispatch, spotId])
    // }, [dispatch, spotId, oneSpot.price])


    // optional chaining allows us to continue even if undefined is returned ( 'try and catch') delays speed, use carefully
    if (!oneSpot?.SpotImages?.length) {
        return 'Spot does not exist.'
    } else {
        return isLoaded && (
            // className='single-spot-div'
            <div key='root'>
                <div className='single-spotDetails'>
                    <h1>{oneSpot.name}  ${oneSpot.price} night
                        <p>
                            <i>★</i>
                            &nbsp;
                            {oneSpot.avgStarRating > 0 ? oneSpot.avgStarRating : 'New'}
                            &nbsp;
                            Hosted by {oneSpot.Owner.firstName} {oneSpot.Owner.lastName}

                            {/* I want to display the number of reviews here */}
                            {/* {oneSpot.numReviews > 0 ? oneSpot.numReviews : ''} */}

                        </p>
                    </h1>

                    <img className='singleSpotImage' key={oneSpot.SpotImages[0].url} src={oneSpot.SpotImages[0].url} alt={'Not a proper url'} />

                    <div className='singleSpotAddress'>{oneSpot.address}, {oneSpot.city}, {oneSpot.state} {oneSpot.country}</div>

                    <br></br>
                    <div key={oneSpot.description}>{oneSpot.description} </div>
                </div>


                <div>
                    <SpotReviews />
                </div>
            </div>
        )
    }
}

export default DisplaySingleSpot;