import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteOneReview, getAllReviews } from '../../store/reviews';
import CreateReviewFormModal from '../CreateReviewFormModal';
// import CreateReviewForm from '../CreateReviewFormModal/CreateReviewForm';
// import CreateReviewFormModal from '../CreateReviewFormModal/CreateReviewForm';
import './SpotReviews.css';
import { clearSpot } from '../../store/reviews';

const SpotReviews = ({ reviewId }) => {
    const sessionUser = useSelector((state) => state.session.user);
    const owner = useSelector((state) => state.spots.singleSpot.Owner);
    const history = useHistory();
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    // console.log(`~~~~~~~~~~~~~~~~~~~~~~~~this is spotId:`, spotId);
    const reviews = useSelector(state => state.reviews)
    console.log(`~~~~~~!!~~~~~~reviews~~~~~~~~!!~~~~~~~~~~~~`, reviews)
    const spot = useSelector(state => state.spots.singleSpot);


    // const arrayreviews = useSelector((state) => Object.values(state.reviews))
    // console.log(arrayreviews, '~~~~~~arrayreviews');

    const currUser = useSelector(state => state.session.user)
    // console.log("reviews state from All Reviews for Spot:", reviews)
    console.log(currUser, `currUser here`)

    const currSpotReviews = Object.values(reviews)
    // console.log(currSpotReviews, `!!!!!!!!!!~~~~~currSpotReviews~~~~~~~~~~~~!!!!!!!!!!`);
    // console.log(currSpotReviews[0].userId, `!!!!!!!!!!~~~~~currSpotReviews.id~~~~~~~~~~~~!!!!!!!!!!`);

    // const reviewId = currSpotReviews[0].userId;


    const reviewsArr = Object.values(reviews)
    let reviewUser;
    if (sessionUser) reviewUser = reviewsArr.filter(review => review.userId === sessionUser.id)
    console.log(reviewUser, `~~~~~~~~~~~reviewUser~~`)
    // {!reviewUser && sessionUser && owner?.id !== sessionUser?.id } 


    // !reviewUser && sessionUser && owner?.id !== sessionUser?.id
    // console.log(!reviewUser, `this is !reviewUser`)
    // console.log(sessionUser)
    console.log(owner, `~~~~~~~~~~~~~`)
    console.log(owner.id, `~~~~~~~~~~~owner.id`)







    useEffect(() => {

        dispatch(getAllReviews(spotId))
            .then(() => setIsLoaded(true))
        return () => dispatch(clearSpot())

    }, [dispatch, spotId])

    // deleteOneReview
    // const clickReviewDelete = async (reviewId, e) => {
    //     console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~this is reviewId:::`, reviewId)
    //     await dispatch(deleteOneReview(reviewId))
    //     e.prevent.Default();
    //     history.push('/');
    // }
    // const [reviewId, setReviewId] = useState();
    // useEffect(() => {
    //     dispatch(deleteOneReview(currSpotReviews.id))
    // }, [dispatch, currSpotReviews.id])
    // useEffect(() => {
    //     dispatch(deleteOneReview(reviewId))
    // }, [dispatch, reviewId])
    // console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~sessionUser:~~`, sessionUser)
    // .filter(review => {
    // console.log("review.spotId:", review.spotId)
    //     return review.spotId === +spotId;
    // })
    // console.log("currSpotReviews from All Reviews for Spot:", currSpotReviews)

    if (!currSpotReviews) return null;

    let userId
    if (currUser) userId = currUser.id;

    return isLoaded && (
        <div className='reviewDisplay'>
            {/* <stronger>See what others have to say!</stronger> */}
            <div className="review-title">
                <i>★</i>
                &nbsp;
                <span>{' '}{spot.avgStarRating === "NaN" ? `No Rating` : spot.avgStarRating.toString().slice(0, 4)}{` · `}</span>
                <i>{currSpotReviews.length}{' '}reviews{' '}</i>
            </div>

            {/* <div className="create-review">{
                currUser &&
                spot.ownerId === userId
            }
            </div> */}

            <div className="each-review-detail" >
                {currSpotReviews.length !== 0 && currSpotReviews.map(review => {
                    return (
                        <div>

                            <div className='reviewsContent'>

                                <div className='fas fa-user-circle'> {review?.User?.firstName}{" "}{review?.User?.lastName}</div>
                                <small>{new Date(review.createdAt).toString('').slice(3, -42)}</small>
                                <div className='reviewComment'>"{review.review}"</div>
                            </div>

                        </div>


                    )
                })}
            </div >
            {sessionUser && !reviewUser.length && owner?.id !== sessionUser?.id && (<CreateReviewFormModal />)}

        </div >
    )
}

export default SpotReviews;