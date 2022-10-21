import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { actionDeleteSpot, getCurrentUserSpots } from "../../store/spots"
// import { getReviews } from "../../store/reviews"
import { NavLink, Redirect } from "react-router-dom"
import "./UserSpots.css"
import EditSpotFormModal from "../EditSpot"

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
    console.log('~~~~~~~~~~~~~~~~~ownedSpots~~~~~~~~~~~~~~~~~~~', ownedSpots)


    if (spotsData.length === 0) {
        return 'my data is still showing up EMPTY post hard refresh..'
    } else {

        return (
            <div >

                {spotsData < 1 && <h2 >my data is still showing up EMPTY</h2>}
                <div >
                    {ownedSpots?.map((spot) => (
                        <div className='allSpot-div'>
                            <NavLink to={`/spots/${spot.id}`}>
                                <div >
                                    <div>
                                        <img className='spotImage' key={spot.previewImage} src={spot.previewImage} alt={spot.previewImage} />
                                    </div>
                                    <div className='spotDetails' >
                                        <div>{spot.name}</div>
                                        <div key={spot.name}>{spot.city}, {spot.state}</div>
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

                            <div >
                                <div>

                                    <EditSpotFormModal spotId={spot.id} />


                                </div>
                                <button
                                    onClick={() => dispatch(actionDeleteSpot(spot.id))}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}
export default MySpots;