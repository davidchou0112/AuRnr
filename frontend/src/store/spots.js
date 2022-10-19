import { csrfFetch } from './csrf';

// CONSTANTS TO AVOID DEBUGGING TYPOS -----------------------------------------

const GET_ALL_SPOTS = 'spots/displayAllSpots';
const GET_SINGLE_SPOT = 'spots/displaySingleSpot'
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

// Display single spot ()
const displaySingleSpot = (singleSpot) => {
    return {
        type: GET_SINGLE_SPOT,
        singleSpot
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

// Getting Details of a Spot by Id
export const actionGetOneSpot = (spotId) => async dispatch => {
    const response = await fetch(`/api/spots/${spotId}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(displaySingleSpot(data))
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

    // console.log(response, '----------------------------------response')

    if (response.ok) {
        dispatch(addOneSpot(newSpotData));
        return newSpotData
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

// Deleting a spot
export const actionDeleteSpot = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE_SPOT'
    });
    if (response.ok) {
        dispatch(deleteSpot(spotId))
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
                // console.log({ action })
                newState[spot.id] = spot;
                // console.log('this is spot from sessionReducer()------------------', spot)
            });
            return {
                ...newState,
                ...state,
                spot: action.spots
            };


        //  Display single spot
        case GET_SINGLE_SPOT:
            const oneSpot = {
                ...state,
                [action.spots.id]: action.spots
            }
            return oneSpot


        // Create a spot
        case ADD_ONE_SPOT:
            const addSpot = {
                ...state,
                [action.spots.id]: action.spots
            }
            return addSpot


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
            };


        // Delete a spot 
        case DELETE_SPOT:
            const deleteMe = { ...state };
            delete deleteMe[action.spotId];
            return deleteMe;


        default:
            return state;
    }
};

export default spotsReducer;