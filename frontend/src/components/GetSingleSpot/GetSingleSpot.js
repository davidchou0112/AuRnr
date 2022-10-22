import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllReviews } from '../../store/reviews';

import { actionGetOneSpot } from '../../store/spots';
import CreateReviewFormModal from '../CreateReviewFormModal';
// import CreateReviewForm from '../CreateReviewFormModal/CreateReviewForm';
import SpotReviews from '../Reviews/SpotReviews';

import './GetSingleSpot.css'

const DisplaySingleSpot = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    // console.log(spotId, `~~~~~~~~~~~~~~~~spotId~~~~~~~~~~~~~~~~~~`);

    // const { spot } = useParams();
    // console.log(spot, '------------------------spot----------------'); //undefined

    // const oneSpot = useSelector(state => state.singleSpot)
    // const oneSpot = useSelector(state => { if (state.spot.singleSpot) return state.spots.singleSpot });
    const oneSpot = useSelector(state => state.spots.singleSpot);
    // console.log(`~~~~~~~~spot from spot detail component~~~`, oneSpot)

    useEffect(() => {
        dispatch(actionGetOneSpot(spotId))
        dispatch(getAllReviews())
        // console.log(oneSpot.SpotImages[0].url, `~~~~~~~~~~~~~~~~~~~~~`)
    }, [dispatch, spotId])
    // }, [dispatch, spotId, oneSpot.price])



    // const spotImgArr = spot?.SpotImages;
    // console.log("spot from component/singleSpot", spotImgArr)

    // let prevImgUrl;
    // let otherImgUrlArr = [];
    // if (spotImgArr) {
    //     for (let img of spotImgArr) {
    //         if (img.preview === true) {
    //             prevImgUrl = img.url;
    //         } else {
    //             otherImgUrlArr.push(img.url)
    //         }

    //     }


    // optional chaining allows us to continue even if undefined is returned ( 'try and catch') delays speed, use carefully
    if (!oneSpot?.SpotImages?.length) {
        return "Loading..."
    } else {
        // console.log(oneSpot, '~~~~~~~~~~~~~~~~~~oneSpot~~~~~~~~~')
        // console.log(oneSpot.SpotImages, `~~~~~~~~~~~~~~~~~~~~~~~~~~~this is~~~~~~~~~`)
        // const oneSpot1 = useSelector(state => state.spots)
        // console.log(oneSpot1, '~~~~~~~~~~~~~~~~~~oneSpot1~~~~~~~~~')

        // const oneSpot2 = useSelector(state => state)
        // console.log(oneSpot2, '~~~~~~~~~~~~~~~~~~oneSpot2~~~~~~~~~')

        // console.log(oneSpot.spots.singleSpot, '~~~~!!~~~~~~~~~oneSpot.singleSpot~~~~~~!!!~~~')


        // if (!Object.values(oneSpot).length) {
        //     return null
        // }
        return (
            <div className='single-spot-div'>
                <div >
                    <div>{oneSpot.name}</div>
                    <img className='spotImage' key={oneSpot.SpotImages[0].url} src={oneSpot.SpotImages[0].url} alt={'Not a proper url'} />
                    <div className='single-spotDetails' >
                        <p key={oneSpot.address}>{oneSpot.address} </p>
                        <p key={oneSpot.avgRating}>{oneSpot.avgRating} </p>
                        <p key={oneSpot.city}>{oneSpot.city} </p>
                        <p key={oneSpot.country}>{oneSpot.country} </p>
                        <p key={oneSpot.description}>{oneSpot.description} </p>
                        <p key={oneSpot.price}>{oneSpot.price} </p>
                    </div>
                </div>

                <div>
                    <CreateReviewFormModal />
                </div>
                <div>
                    <SpotReviews />
                </div>
            </div>


        )
    }
}

export default DisplaySingleSpot;