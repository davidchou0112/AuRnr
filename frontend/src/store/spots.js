import { csrfFetch } from './csrf';

// CONSTANTS TO AVOID DEBUGGING TYPOS -----------------------------------------

const GET_ALL_SPOTS = 'spots/displayAllSpots';
const ADD_ONE_SPOT = 'spots/addOneSpot';
const UPDATE_SPOT = 'spots/updateSpot';
const DELETE_SPOT = 'spots/deleteSpot';

// REGULAR ACTION CREATOR------------------------------------------------------

// Display all spots (x)
const displayAllSpots = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        spots
    }
}

// Create a single new spot (\) check notes
const addOneSpot = (spots) => {
    return {
        type: ADD_ONE_SPOT,
        spots
    }
}

// Edit a spot ()
const updateSpot = (spots) => {
    return {
        type: UPDATE_SPOT,
        spots
    }
}

// Delete a spot
const deleteSpot = (spotId) => {
    return {
        type: DELETE_SPOT,
        spotId
    }
}

// THUNK ACTION CREATORS-------------------------------------------------------

// Getting/display all spots 
export const getAllSpots = () => async dispatch => {
    const response = await fetch(`/api/spots`);

    if (response.ok) {
        const data = await response.json();
        // console.log('this is data -------', data)
        dispatch(displayAllSpots(data));

    }
}

// Creating a spot (did not add new image option)
export const actionAddOneSpot = (newSpot) => async dispatch => {
    const response = await csrfFetch(`/api/spots`, {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSpot)
    })

    const newSpotData = await response.json();

    if (response.ok) {
        dispatch(addOneSpot(newSpotData));
    }
}

// Editing a spot
export const actionUpdateSpot = (update, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {

        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(update)
    })

    const updatedSpot = await response.json();

    if (response.ok) {
        dispatch(updateSpot(updatedSpot));
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
    let newState = {};

    switch (action.type) {

        // Display all spots
        case GET_ALL_SPOTS:
            action.spots.Spots.forEach(spot => {
                newState[spot.id] = spot;
                // console.log('this is spot from sessionReducer()-------------------------------------', spot)
            });
            return {
                ...newState,
                ...state,
                spot: action.spots
            }

        // Create a spot
        case ADD_ONE_SPOT:
            if (!state[action.spots.Spots.id]) {
                const addSpot = {
                    ...state,
                    [action.spot.id]: action.spots.Spots
                }
                return addSpot
            }
            return {
                ...state,
                [action.spot.id]: {
                    ...state[action.spots.Spots.id],
                    ...action.spot
                }
            }

        // Edit a spot
        case UPDATE_SPOT:
            if (!state[action.spots.Spots.id]) {
                const editSpot = {
                    ...state,
                    [action.spot.id]: action.spots.Spots
                }
                return editSpot
            }

            return {
                ...state,
                [action.spot.id]: {
                    ...state[action.spots.Spots.id],
                    ...action.spot
                }
            }

        default:
            return state;
    }
};

export default spotsReducer;