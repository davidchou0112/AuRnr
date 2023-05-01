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
import * as bookingActions from '../../store/bookings'
import BkComfirmationModal from "../BookingModal";


const DisplaySingleSpot = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const currentUser = useSelector((state) => state.session.user);

    const currentUserId = currentUser?.id;

    const oneSpot = useSelector(state => state.spots.singleSpot);

    const spotUserId = useSelector(state => state.spots.singleSpot.Owner?.id);

    // const currentBookings = useSelector((state) => state.booking.allBookings);
    // console.log('This is currentBookings', currentBookings)


    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [guestNum, setGuestNum] = useState(1);
    const [errors, setErrors] = useState([]);
    // const [bkPrice, setBkPrice] = useState(0);
    const [showBkConfirmation, setShowBkConfirmation] = useState(false);

    let days = (new Date(endDate) - new Date(startDate)) / 1000 / 60 / 60 / 24;
    let totalPrice = 0;
    let cleaningFee = 125;
    let serviceFee = 200;
    let finalPrice = 0;
    if (days > 0) {
        totalPrice = oneSpot.price * days;
        finalPrice = totalPrice + cleaningFee + serviceFee;
    }

    const handleBooking = (e) => {
        e.preventDefault();
        let Errors = [];
        setErrors([]);
        setShowBkConfirmation(false);
        if (!currentUser) {
            setErrors(["You must be Logged in first"]);
            return;
        }
        if (currentUserId === spotUserId) {
            setErrors(["Hosts of location cannot make reservations"]);
            return;
        }
        if (!startDate || !endDate) {
            setErrors(["Must enter valid dates"]);
            return;
        }
        const payload = {
            startDate,
            endDate,
        };

        return dispatch(bookingActions.createBookingThunk(spotId, payload))
            .catch(async (res) => {
                const data = await res.json();
                if (data.statusCode >= 400) {
                    Errors.push(data.message);
                    setErrors(Errors);
                }
            })
            .then(() => {
                if (!Errors.length) {
                    setShowBkConfirmation(true);
                }
            });
    };


    useEffect(() => {
        dispatch(actionGetOneSpot(spotId))
            .then(() => dispatch(getAllReviews()))
            .then(() => dispatch(bookingActions.fetchAllBookings(spotId)))
            .then(() => setIsLoaded(true))
    }, [dispatch, spotId])


    if (!oneSpot?.SpotImages?.length) {
        return 'Spot does not exist.'
    } else {
        return isLoaded && (
            <div key='root'>
                <div className='single-spotDetails'>
                    <div>
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

                        <div className='descriptionAndBooking'>
                            <div>
                                <div className='descriptionWrapper'>
                                    <div className='singleSpotHeadline'>About this location:</div>
                                    <div className='description'>{oneSpot.description} </div>
                                </div>

                                <div className='singleSpotLnBr'></div>

                                <div className='singleSpotInfo'>
                                    <img className='badges' src={countertop} alt='countertop' />
                                    <div>
                                        <div className='singleSpotHeadline'>Dedicated workspace.</div>
                                        <div className='singleSpotDescription'>A private room with WiFi that's well suited for working.</div>
                                    </div>
                                </div>
                                <div className='singleSpotInfo'>
                                    <img className='badges' src={badge} alt='badge' />
                                    <div>
                                        <div className='singleSpotHeadline'>{oneSpot.Owner.firstName} is a Superhost</div>
                                        <div className='singleSpotDescription'>{oneSpot.Owner.firstName} provides 24/7 assistance regarding this location.</div>
                                    </div>
                                </div>
                                <div className='singleSpotInfo'>
                                    <img className='badges' src={key} alt='key' />
                                    <div>
                                        <div className='singleSpotHeadline'>Great check-in experience</div>
                                        <div className='singleSpotDescription'>100% of recent guests gave the check-in process a 5-Star rating!</div>
                                    </div>
                                </div>

                                <div className='singleSpotLnBr'></div>

                                <div>
                                    <img src={aircover} alt='aircover' />
                                    <div className='aircoverDescription'>Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues including trouble checking in.</div>
                                </div>

                                <div className='singleSpotLnBr'></div>
                            </div>

                            <form className="bk-form" onSubmit={handleBooking}>
                                <div className='errorMessage'>
                                    {errors &&
                                        errors.map((error) => <div key={error}>{error}</div>)}
                                </div>
                                <div className="ckin-out">
                                    <div className="ckin">
                                        <label className="booking-label">CHECK-IN</label>
                                        <input
                                            type="date"
                                            className="bk_date_input"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                        ></input>
                                    </div>
                                    <div className="ckout">
                                        <label className="booking-label">CHECK-OUT</label>
                                        <input
                                            type="date"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                        ></input>
                                    </div>
                                </div>
                                <div id="ck-guest">
                                    <label>Guest</label>
                                    <select
                                        value={guestNum}
                                        onChange={(e) => setGuestNum(e.target.value)}
                                    >
                                        <option value="1">1 guest</option>
                                        <option value="2">2 guests</option>
                                        <option value="3">3 guests</option>
                                        <option value="4">4 guests</option>
                                        <option value="5">5 guests</option>
                                        <option value="6">6 guests</option>
                                    </select>
                                </div>
                                <div id="bk_fine_text">you won't be charged yet</div>
                                <div className="bk_fee_item">
                                    <div className="bk_fees">
                                        ${oneSpot.price} x {days} nights
                                    </div>
                                    <div className="bk_fee_misc_price">
                                        ${oneSpot.price * days}
                                    </div>
                                </div>
                                <div className="bk_fee_item">
                                    <div className="bk_fees">Cleaning fee</div>
                                    <div className="bk_fee_misc_price">$125</div>
                                </div>
                                <div className="bk_fee_item">
                                    <div className="bk_fees">Service fee</div>
                                    <div className="bk_fee_misc_price">$200</div>
                                </div>
                                <div className="linebreak"></div>

                                <div className="bk_total_price">
                                    <div id="bk-total">Total price before taxes: </div>
                                    <div id="bk-total">${finalPrice}</div>
                                </div>
                                <button id="bk-btn" type="submit">
                                    Reserve
                                </button>
                            </form>
                        </div>
                    </div>

                    <div>
                        <div className='reviewsHeadline'>Reviews</div>
                        <SpotReviews />
                    </div>

                    <BkComfirmationModal showBkConfirmation={showBkConfirmation} setShowBkConfirmation={setShowBkConfirmation} />
                </div>
            </div>
        )
    }
}

export default DisplaySingleSpot;