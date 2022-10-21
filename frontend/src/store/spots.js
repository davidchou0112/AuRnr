import { csrfFetch } from './csrf';

// CONSTANTS TO AVOID DEBUGGING TYPOS -----------------------------------------
//        type      =   payload  / action creator
const GET_ALL_SPOTS = 'spots/displayAllSpots';
const GET_SINGLE_SPOT = 'spots/displaySingleSpot'
const ADD_ONE_SPOT = 'spots/addOneSpot';
const ADD_IMG = 'spots/addImg';
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

// Display single spot (-)
const displaySingleSpot = (singleSpot) => {
    return {
        type: GET_SINGLE_SPOT,
        singleSpot
    }
}

// Create a single new spot (\)
const addOneSpot = (spots) => {
    return {
        type: ADD_ONE_SPOT,
        spots
    }
}

// Add an Image
const addImg = (imgData) => {
    return {
        type: ADD_IMG,
        imgData
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
        // console.log(displaySingleSpot(data), `111~~~~~~~displaySingleSpot(data)~~~~1111111`)
    }
}

// Get Spots of the Current User
export const getCurrentUserSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots/current')

    if (response.ok) {
        const userSpots = await response.json()
        dispatch(displayAllSpots(userSpots))
        return userSpots
    }
}

// Creating a spot 
export const actionAddOneSpot = (newSpot, imgData) => async dispatch => {
    // Adding a spot data
    const response = await csrfFetch(`/api/spots`, {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSpot)
    })

    const newSpotData = await response.json();

    // Adding an image data
    const { url, preview } = imgData;
    const imgResponse = await csrfFetch(`/api/spots/${newSpotData.id}/images`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url, preview })
    });

    const images = await imgResponse.json();

    // console.log(addImg(images), '----------------------------------addImg(images)')
    // console.log(newSpotData, '`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~newSpotData')

    if (response.ok && imgResponse.ok) {
        dispatch(addOneSpot(newSpotData));
        dispatch(addImg(images));

        newSpotData.previewImages = images
        return newSpotData
    }
}


// Add an Image
export const actionAddImg = (imgData, spotId) => async dispatch => {
    const { url, preview } = imgData;
    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url, preview })
    })

    const images = await response.json();
    if (response.ok) {
        dispatch(addImg(images))
        return images
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


    if (response.ok) {
        const updatedSpot = await response.json();
        dispatch(updateSpot(updatedSpot));
        return updateSpot;
    }
}

// Deleting a spot
export const actionDeleteSpot = (spotId) => async dispatch => {
    const response = await csrfFetch(`/spots/${spotId}`, {
        method: 'DELETE_SPOT'
    });
    if (response.ok) {
        dispatch(deleteSpot(spotId))
    }
}

// STATE OBJECT ---------------------------------------------------------

const initialState = { allSpots: {}, singleSpot: {} };

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
            let allMySpots = {};
            // spreading in current state, and initial state with the object key allSpots
            newState = {
                ...state,
                //                  this allSpots is within our initial state object with key of allSpots
                allSpots: { ...action.spots }
            }
            action.spots.Spots.forEach(spot => {
                // console.log({ action })
                allMySpots[spot.id] = spot;
                // console.log('this is spot from sessionReducer()------------------', spot)
            });
            newState.allSpots = allMySpots
            return newState


        //  Display single spot
        case GET_SINGLE_SPOT:
            newState = {
                ...state,
                singleSpot: { ...state.singleSpot }
            }

            // console.log(state.singleSpot, `!!!!!!~~~~~~~~~~~~~~!!!!!!!!!!!action.data~~~~~~~~`)
            newState.singleSpot = action.singleSpot
            // action.spots.forEach(spot => {
            //     oneSpot[spot.id] = spot;
            // })
            // console.log(newState, `~~~~~~~~~~~~~~~~~~~~~~~~~~newState~~~~~~~~~~~~~~`)
            return newState

        // Add an Image
        case ADD_IMG:
            newState = {
                ...state,
                singleSpot: { ...state.singleSpot }
            }
            newState.singleSpot = action.imgData
            return newState

        // Create a spot
        case ADD_ONE_SPOT:
            newState = {
                ...state,
                singleSpot: action.spots
            }
            newState.singleSpot = action.spots
            return newState


        // Edit a spot
        case UPDATE_SPOT:
            // newState = {
            //     ...state,
            //     singleSpot: action.spots
            // }
            // if (!newState) {
            //     newState = {
            //         ...state,
            //         singleSpot: action.spots
            //     }
            //     return newState
            // } else {
            //     newState = {
            //         ...state,
            //         singleSpot: action.spots
            //     }
            //     newState.singleSpot = action.spots
            // }
            // return newState;
            newState = {
                ...state,
                singleSpot: action.spots
            }
            newState.singleSpot = action.spots
            return newState


        // Delete a spot 
        case DELETE_SPOT:
            newState = {
                ...state,
                allSpots: { ...state.allSpots },
                singleSpot: { ...state.singleSpot }
            }
            delete newState.singleSpot[action.spotId]
            newState.singleSpot = {}
            return newState;
        // newState = { ...state };
        // delete newState[action.spotId];
        // return newState;

        default:
            return newState;
    }
};

export default spotsReducer;