// import { csrfFetch } from './csrf';

// CONSTANTS TO AVOID DEBUGGING TYPOS -----------------------------------------

const GET_ALL_SPOTS = 'spots/displayAllSpots';

// REGULAR ACTION CREATOR------------------------------------------------------

const displayAllSpots = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        spots
    }
}

// THUNK ACTION CREATORS-------------------------------------------------------

// THUNK action creator for getting/display all available spots 
export const getAllSpots = () => async dispatch => {
    const response = await fetch(`/api/spots`);

    if (response.ok) {
        const data = await response.json();
        // console.log('this is data -------', data)
        dispatch(displayAllSpots(data));

    }
}

// STATE OBJECT ---------------------------------------------------------

const initialState = { spots: [] };

// for getting all spots
// const sortSpot = (spots) => {
//     return spots.sort((spotA, spotB) => {
//         return spotA - spotB;
//     }).map((spot) => spot.id);
// };

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_ALL_SPOTS:
            let newState = {};
            action.spots.Spots.forEach(spot => {
                newState[spot.id] = spot;
                // console.log('this is spot from sessionReducer()-------------------------------------', spot)
            });
            return {
                ...newState,
                ...state,
                spot: action.spots
            }

        default:
            return state;
    }
};

export default spotsReducer;