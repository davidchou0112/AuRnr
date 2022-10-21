import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';

import { getAllReviews } from '../../store/reviews';
import CreateReviewFormModal from '../CreateReviewFormModal/CreateReviewForm';
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


    const currSpotReviews = Object.values(reviews).filter(review => {
        // console.log("review.spotId:", review.spotId)
        return review.spotId === spotId;
    })

    // console.log("currSpotReviews from All Reviews for Spot:", currSpotReviews)

    if (!currSpotReviews) return null;

    let userId
    if (currUser) userId = currUser.id;

    return (
        <div>
            <div className="review-title">
                <i className="fa-sharp fa-solid fa-star"></i>
                <span>{' '}{spot.avgStarRating === "NaN" ? `No Rating` : spot.avgStarRating}{` · `}</span>
                <label>{currSpotReviews.length}{' '}reviews{' '}</label>
            </div>
            <div className="create-review">{
                // currSpotReviews.length === 0
                // &&
                currUser
                && spot.ownerId !== userId
                // && <NavLink to={`/${spot.id}/create-reviews`} style={{ textDecoration: 'none', color: 'rgb(207, 99, 117)'}}>
                //   Review this Spot...
                //   </NavLink>
                && <CreateReviewFormModal />
            }
            </div>
            <div className="review-details-container">
                {currSpotReviews.length !== 0 && currSpotReviews.map(review => {
                    return review.ReviewImages && (
                        <div className="each-review-detail" key={review.id}>
                            <div>
                                <div className="each-review-user">{review?.User?.firstName}{" "}{review?.User?.lastName}</div>
                                <div className="each-review-date">{new Date(review.createdAt).toString().slice(3, -42)}</div>
                            </div>
                            <div>{review.review}</div>
                            <div>{review.ReviewImages.map(imageUrl => <img className="each-review-img" src={imageUrl} alt={imageUrl} key={imageUrl}></img>)}</div>
                            {/* {console.log("--------------------===========", review.ReviewImages)} */}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default SpotReviews;