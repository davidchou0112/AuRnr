import { useEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getMyReviews, deleteOneReview, clearSpot } from '../../store/reviews'
import './MyReviews.css'

const MyReviews = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    // const spots = useSelector(state => state.spots.allSpots);
    const userId = useSelector(state => state.session.user.id);
    const reviews = useSelector(state => state.reviews);


    // console.log("!!!!!!!!!!!!!!!", reviews)


    useEffect(() => {
        dispatch(getMyReviews());
        // return () => dispatch(clearSpot());
        // dispatch(getAllSpots());
    }, [dispatch])

    const currSpotReviews = Object.values(reviews).filter(review => {
        return review.userId === +userId;
    })





    const deleteReviewClickEvent = async (reviewId) => {
        // window.alert('Are you sure you want to delete?')
        await dispatch(deleteOneReview(reviewId))
        // await dispatch(clearSpot());
        // history.push("/my-reviews");
        window.location.reload()
    }

    return (
        <>
            <div className='reviews-display'>
                <h1>My Reviews</h1>

                <div className='reviews-outer-container'>
                    <div>
                        {currSpotReviews.length !== 0 ? currSpotReviews.map(review => {
                            return (
                                <div >
                                    <div>
                                        <NavLink style={{ textDecoration: 'none', color: 'black' }} to={`/spots/${review?.Spot?.id}`}>
                                            {/* <span>Spot name:{' '}</span> */}
                                            <span >{review?.Spot?.name}</span>
                                        </NavLink>
                                        <span >{` · `}<i ></i></span>
                                        ★{review?.stars}
                                    </div>
                                    <div>
                                        <div >{new Date(review?.createdAt).toString().slice(3, -42)}</div>
                                    </div>
                                    <div className='review-details'>{review.review}</div>
                                    {/* <div>{review?.ReviewImages?.map(imageUrl => <img  src={imageUrl} alt={imageUrl} key={imageUrl}></img>)}</div> */}
                                    <div>
                                        <button className='delete-review-button' onClick={() => deleteReviewClickEvent(review.id)}>Delete</button>
                                    </div>
                                </div>
                            )
                        })
                            : <div>You do not have any reviews...</div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyReviews;