import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { createOneReview } from '../../store/reviews';
import { getAllReviews } from '../../store/reviews';
import "./CreateReviewForm.css";

const CreateReviewForm = ({ reviewId, setModal }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { spotId } = useParams()

    const [errors, setErrors] = useState([]);
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(5);
    const [url] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const ratingInteger = parseInt(rating)
        const newReview = {
            review,
            stars: ratingInteger,
            url
        };
        // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~CreateReview-newReview:", newReview)

        dispatch(createOneReview(newReview, spotId, url))
            .then(res => history.push(`/spots/${spotId}`))
            .then(res => setModal(false))
            .catch(async (res) => {
                // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~CreateReview-dispatch-res:", res)
                if (res === undefined) return null;
                const message = await res.json();
                if (message && message.errors) {
                    setErrors(message.errors)
                } else if (message.message) {
                    setErrors([message.message])
                };

                // console.log("~~~~~~~~~~~~!!!12312123!!!!!!~~~~~~~~~~~~~message", message)
            });
        await dispatch(getAllReviews(spotId));

    }

    // // () cancel button is not closing modal
    // const handleCancelClick = (e) => {
    //     // e.preventDefault();
    //     setModal(false);
    //     history.push(`/spots/${spotId}`);
    //     // window.location.reload();
    // }

    return (
        <div className="create-review-outer-container">
            <form onSubmit={handleSubmit}>
                <div id='createReviewTitle'>Create Review</div>
                <div id='createReview-fieldContainer'>
                    <ul>
                        {errors && errors.map((error, idx) => <li key={idx} className="errors-li">{error}</li>)}
                    </ul>
                    <div className="inputContainer" id="createReview-top-label">
                        <label className="create-spot-label">Review:
                            <textarea
                                id='review'
                                placeholder='Providing your review here..'
                                value={review}
                                required
                                onChange={e => setReview(e.target.value)}
                                className="createReview-review-inputField"
                            >
                            </textarea>
                        </label>
                    </div>

                    <div className="inputContainer" id="createReview-middle-label">
                        <label className="create-spot-label">Rating (1 - 5):
                            <input
                                type='number'
                                min='1'
                                max='5'
                                placeholder='5'
                                value={rating}
                                required
                                onChange={e => setRating(e.target.value)}
                                className="createReview-inputField"
                            />
                        </label>
                    </div>

                    {/* <div className="inputContainer" id="bottom-label">
                        <label className="create-spot-label">Img url
                            <input
                                type="text"
                                placeholder="http://..."
                                // required
                                value={url}
                                onChange={e => setUrl(e.target.value)}
                                className="createSpot-inputField"
                            />
                        </label>
                    </div> */}

                    <div>
                        <button className="styledButton">Create Review</button>
                        {/* <button type="button" onClick={handleCancelClick} className="styledButton">Cancel</button> */}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateReviewForm;