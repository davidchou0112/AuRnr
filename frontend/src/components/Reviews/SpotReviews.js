import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteOneReview, getAllReviews } from '../../store/reviews';
import CreateReviewFormModal from '../CreateReviewFormModal';
// import CreateReviewForm from '../CreateReviewFormModal/CreateReviewForm';
// import CreateReviewFormModal from '../CreateReviewFormModal/CreateReviewForm';
import './SpotReviews.css';

const SpotReviews = ({ reviewId }) => {
    const sessionUser = useSelector((state) => state.session.user);
    const history = useHistory();
    const dispatch = useDispatch();
    const { spotId } = useParams();
    console.log(`~~~~~~~~~~~~~~~~~~~~~~~~this is spotId:`, spotId);
    const reviews = useSelector(state => state.reviews)
    console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`,)
    const spot = useSelector(state => state.spots.singleSpot);
    const currUser = useSelector(state => state.session.user)
    console.log("reviews state from All Reviews for Spot:", reviews)

    const currSpotReviews = Object.values(reviews)
    console.log(currSpotReviews, `!!!!!!!!!!~~~~~currSpotReviews~~~~~~~~~~~~!!!!!!!!!!`);
    // console.log(currSpotReviews[0].userId, `!!!!!!!!!!~~~~~currSpotReviews.id~~~~~~~~~~~~!!!!!!!!!!`);

    // const reviewId = currSpotReviews[0].userId;

    useEffect(() => {
        dispatch(getAllReviews(spotId))

    }, [dispatch, spotId])


    // deleteOneReview
    const clickReviewDelete = async (reviewId, e) => {

        console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~this is reviewId:::`, reviewId)

        await dispatch(deleteOneReview(reviewId))
        e.prevent.Default();

        history.push('/');

    }


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

    return (
        <div>
            <div className="review-title">
                <i >★</i>
                &nbsp;
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
                                <div className="each-review-date">On: {new Date(review.createdAt).toString('').slice(3, -42)}</div>
                                {/* {review.spotId === spotId ? currSpotReviews : null} */}
                                {/* {currSpotReviews.review} */}
                                {/* {review.review} */}
                                {/* {review.userId === currUser.id &&
                                    <button onClick={reviewId => setReviewId(currUser.id)}>
                                        delete
                                    </button>} */}
                                <div>~ {currSpotReviews[0].review} ~</div>

                                {/* testing delete buttons here */}

                                {/* sort of working */}
                                {/* {sessionUser && review.userId === currUser.id ? <button >delete</button> : null} */}


                                {/* <button onClick={deleteOneReview(review.id)}>Delete</button> */}

                                {/* {sessionUser && review.userId === currUser.id ? <button onClick={clickReviewDelete}>Delete</button> : null} */}



                                {/* not working
                                <div>
                                    <button onClick={deleteOneReview(reviewId)}>
                                        Delete
                                    </button>
                                </div> */}


                            </div>
                            {/* <div>{review.map(imageUrl => <img className="each-review-img" src={imageUrl} alt={imageUrl} key={imageUrl}></img>)}</div> */}
                            {/* {console.log("--------------------===========", review.ReviewImages)} */}


                        </div>

                    )
                })}
            </div >
            <CreateReviewFormModal />
        </div >
    )
}

export default SpotReviews;