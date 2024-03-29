import { csrfFetch } from './csrf';
const LOAD_ALL_REVIEWS = 'reviews/setLoadAllReviews';
const CREATE_REVIEW = 'reviews/setCreateReview';
const ADD_REVIEW_IMG = 'reviews/setAddReviewImg';
const UPDATE_REVIEW = 'reviews/setUpdateReview';
const DELETE = 'reviews/setDeleteReview';
const CLEARREVIEW = 'reviews/clearReview';
// const RESET = 'reviews/reset';


const allReviews = (reviews) => {
    return {
        type: LOAD_ALL_REVIEWS,
        reviews
    }
}

const createReview = (review) => {
    return {
        type: CREATE_REVIEW,
        review
    }
}

// const addReviewImg = (reviewId, url) => {
//     return {
//         type: ADD_REVIEW_IMG,
//         reviewId,
//         url
//     }
// }


// const updateReview = (review) => {
//   return {
//     type: UPDATE_REVIEW,
//     review
//   }
// }

const deleteReview = (reviewId) => {
    return {

        type: DELETE,
        reviewId
    }
}

export const clearSpot = () => {
    return {
        type: CLEARREVIEW
    }
}




export const getAllReviews = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}/reviews`);

    if (response.ok) {
        const reviews = await response.json();
        dispatch(allReviews(reviews));
        return reviews;
    }

}

export const getMyReviews = () => async (dispatch) => {
    const response = await csrfFetch(`api/reviews/current`);
    if (response.ok) {
        const reviews = await response.json();
        dispatch(allReviews(reviews));
        return reviews;
    }
}

export const createOneReview = (review, spotId) => async (dispatch) => {

    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
    });

    if (!response.ok) {
        let error;
        if (response.status === 404) {
            error = await response.json();
            return error;
        } else {
            let errorJSON;
            error = await response.text();
            try {
                errorJSON = JSON.parse(error);
            } catch {
                throw new Error(error);
            }
            throw new Error(`${errorJSON.title}: ${errorJSON.message}`)
        }
    }

    const newReview = await response.json();
    // console.log('~~~~~~~~~~~~~~~~~~~~createOneReview Thunk - newReview:', newReview)
    dispatch(createReview(newReview));

    return newReview;
}

export const deleteOneReview = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`api/reviews/${reviewId}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        dispatch(deleteReview(reviewId))
    }
}


const initialState = {}

const reviewReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case LOAD_ALL_REVIEWS:
            // newState = { ...state };
            // action.reviews.Reviews.forEach(review => {
            //     // const newImgArr = []
            //     newState[review.id] = review;
            //     // review.ReviewImages.forEach(imgObj => newImgArr.push(imgObj.url))
            //     // newState[review.id].ReviewImages = newImgArr
            //     // newState = { ...newImgArr }
            // })
            // return { ...newState };
            return {
                ...action.reviews.Reviews
            }


        // action.reviews.Reviews.forEach(review => {
        //     newState[review.id] = review;
        // })
        // return {
        //     ...newState
        // };


        case CREATE_REVIEW:
            newState = { ...state };
            newState[action.review.id] = action.review;
            // console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~reviewReducer-CREATE_REVIEW newState:', newState)
            return newState;

        case ADD_REVIEW_IMG:
            newState = {
                ...state,
                ...state[action.reviewId].User,
                ...state[action.reviewId].ReviewImages,
                [action.reviewId]: {
                    ...state[action.reviewId]
                }
            };
            // console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~this is action present:', action)
            // console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~this is review images:', newState[action.reviewId].ReviewImages)
            newState[action.reviewId].ReviewImages = [action.url]
            // console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~this is review post addition:', newState[action.reviewId].ReviewImages)
            // console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~this is action.url:', action.url)
            return newState;

        case UPDATE_REVIEW:
            return newState;

        case DELETE:
            newState = { ...state };
            // console.log(`~~~~~~~~~~~~~~~~~~dis newState::`, newState)
            delete newState[action.reviewId]
            return newState;


        case CLEARREVIEW:
            newState = {};
            return newState;


        default:
            return state;
    }
}

export default reviewReducer;