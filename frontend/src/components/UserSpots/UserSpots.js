import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionDeleteSpot, getAllSpots, getCurrentUserSpots } from '../../store/spots'
// import { getReviews } from '../../store/reviews'
import { NavLink, Redirect } from 'react-router-dom'
import './UserSpots.css'
import EditSpotFormModal from '../EditSpot'

const MySpots = () => {

    const dispatch = useDispatch();
    const allSpots = useSelector(state => state.spots.allSpots);

    const spotsData = Object.values(allSpots);

    const sessionUser = useSelector(state => state.session.user);

    const ownedSpots = spotsData?.filter((spot) => spot.ownerId === sessionUser.id);

    useEffect(() => {
        dispatch(getCurrentUserSpots())
        dispatch(getAllSpots())
    }, [dispatch])

    if (!sessionUser) {
        return <Redirect to='/' />
    }



    if (!spotsData) {
        return 'my data is still showing up EMPTY post hard refresh..'
    } else {
        <Redirect to='/current' />
        return (
            <div>
                <h1 className='user-spots-title'>My Spots</h1>
                <div className='user-spots'>

                    {ownedSpots?.map((spot) => (
                        <div className='allSpot-div'>
                            <NavLink className='singleSpots-nav' to={`/spots/${spot.id}`}>
                                <div>
                                    <div>
                                        <img className='spotImage' key={spot.previewImage} src={spot.previewImage} alt={spot.previewImage} />
                                    </div>
                                    <div className='spotDetails'>
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
                            <div className='spotDetails' >
                                <div>
                                    <EditSpotFormModal spotId={spot.id} />
                                </div>
                                <button className='deleteButton'
                                    onClick={() => dispatch(actionDeleteSpot(spot.id))}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                    }
                </div>
            </div>
        )
    }
}
export default MySpots;