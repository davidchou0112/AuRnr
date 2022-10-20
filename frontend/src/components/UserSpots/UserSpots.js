import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { actionDeleteSpot, getCurrentUserSpots } from "../../store/spots"
// import { getReviews } from "../../store/reviews"
import { NavLink, Redirect } from "react-router-dom"
import "./UserSpots.css"

const MySpots = () => {

    const dispatch = useDispatch();
    const allSpots = useSelector(state => state.spots.allSpots);
    console.log(allSpots, `~~~~~~~~~~~~~~~~~~~~~~~~~~~ allSpots~~~~~ data`);

    const spotsData = Object.values(allSpots);
    console.log(spotsData, `~~~~~~~~~~~~~~~~~~~~~~~~~spotsData~~~~!@!@!@!~`);

    const sessionUser = useSelector(state => state.session.user);


    useEffect(() => {
        dispatch(getCurrentUserSpots())
    }, [dispatch])

    if (!sessionUser) {
        return <Redirect to="/" />
    }

    const ownedSpots = spotsData?.filter((spot) => spot.ownerId === sessionUser.id);
    // console.log('Owned Spot - UserSpots Component', ownedSpots)

    // if (!ownedSpots || !ownedSpots.length) {
    //   return <h2 className="no-spot"> MEOWMEOW No Spots! </h2>
    // }



    // const deleteUserSpot = async (spotId) => {
    //   await dispatch(actionDeleteSpot(spotId))
    // }

    return (
        <div className="mother">

            {spotsData < 1 && <h2 className="user-spot-message">Manage Your Listings Meow!!!</h2>}
            <div className="spot-mother">
                {ownedSpots?.map((spot) => (
                    <div className="all-owned-spot">
                        <NavLink className="spots" to={`/spots/${spot.id}`}>
                            <div className="individual-spots">
                                <div>
                                    <img className="user-spot-image" key={spot.previewImage} src={spot.previewImage} alt={spot.previewImage} />
                                </div>
                                <div className="user-spot-info">
                                    <div>{spot.name}</div>
                                    <div className="address-star" key={spot.name}>{spot.city}, {spot.state}</div>
                                    <div>
                                        <strong>
                                            ${spot.price}
                                        </strong>
                                        &nbsp;
                                        night
                                    </div>
                                </div>
                            </div>
                        </NavLink>

                        <div className="delete-edit-buttons">
                            <div>
                                <NavLink to={`/spots/${spot.id}/edit`}>
                                    <button className="delete-edit">
                                        Edit
                                    </button>
                                </NavLink>
                                {/* <button className="logout-button" onClick={() => history.push('/my-spots')}>My Spot</button> */}
                            </div>
                            <button className="delete-edit"
                                onClick={() => dispatch(actionDeleteSpot(spot.id))}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="review-mother">
                {/* {allReviewsArr < 1 && <h3>No reviews MEOWMEOW!</h3>} */}
            </div>
        </div>
    )
}
export default MySpots;