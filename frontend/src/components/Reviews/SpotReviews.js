import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllReviews } from '../../store/reviews';
// import CreateReviewForm from '../CreateReviewFormModal/CreateReviewForm';
// import CreateReviewFormModal from '../CreateReviewFormModal/CreateReviewForm';
import './SpotReviews.css';

const SpotReviews = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    // console.log(`~~~~~~~~~~~~~~~~~~~~~~~~this is spotId:`, spotId);
    const reviews = useSelector(state => state.reviews)
    // console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`,)
    const spot = useSelector(state => state.spots.singleSpot);
    const currUser = useSelector(state => state.session.user)
    // console.log("reviews state from All Reviews for Spot:", reviews)

    useEffect(() => {
        dispatch(getAllReviews(spotId))
    }, [dispatch, spotId])

    const sessionUser = useSelector((state) => state.user);

    const currSpotReviews = Object.values(reviews)
    // .filter(review => {
    // console.log("review.spotId:", review.spotId)
    //     return review.spotId === +spotId;
    // })

    // console.log("currSpotReviews from All Reviews for Spot:", currSpotReviews)

    if (!currSpotReviews) return null;

    let userId
    if (currUser) userId = currUser.id;

    return (
        <div>
            <div className="review-title">
                <i>Average Rating:</i>
                <span>{' '}{spot.avgStarRating === "NaN" ? `No Rating` : spot.avgStarRating}{` · `}</span>
                <i>{currSpotReviews.length}{' '}reviews{' '}</i>
            </div>
            <div className="create-review">{
                currUser &&
                spot.ownerId === userId
                // <CreateReviewForm />
            }
            </div>
            <div className="review-details-container">
                {currSpotReviews.length !== 0 && currSpotReviews.map(review => {
                    console.log(`currentSpotReviews~~~~~~~~~~~~~~~~~~~`, currSpotReviews)
                    return (
                        // <div className="each-review-detail" key={review.id}>
                        <div className="each-review-detail" >

                            <div>
                                <div className="each-review-user">By: {review?.User?.firstName}{" "}{review?.User?.lastName}</div>
                                <div className="each-review-date">On: {new Date(review.createdAt).toString().slice(3, -42)}</div>
                            </div>
                            {/* review.review */}
                            <div>{currSpotReviews[0].review}</div>
                            {review.userId === currUser.id && <button>delete</button>}
                            {/* {sessionUser && review.userId === currUser.id ? <button>delete</button> : null} */}

                            {/* <div>{review.map(imageUrl => <img className="each-review-img" src={imageUrl} alt={imageUrl} key={imageUrl}></img>)}</div> */}
                            {/* {console.log("--------------------===========", review.ReviewImages)} */}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default SpotReviews;