// frontend/src/store/session.js
import { csrfFetch } from './csrf';


// CONSTANTS TO AVOID DEBUGGING TYPOS -----------------------------------------
const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const GET_ALL_SPOTS = 'session/displayAllSpots';

// REGULAR ACTION CREATOR------------------------------------------------------

const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user,
    };
};

const removeUser = () => {
    return {
        type: REMOVE_USER,
    };
};

const displayAllSpots = (spots) => ({
    type: GET_ALL_SPOTS,
    spots
})

// THUNK ACTION CREATORS-------------------------------------------------------

export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password,
        }),
    });
    const data = await response.json();
    dispatch(setUser(data));
    return response;
};

export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data));
    return response;
};

export const signup = (user) => async (dispatch) => {
    const { firstName, lastName, username, email, password } = user;
    const response = await csrfFetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
            firstName,
            lastName,
            username,
            email,
            password,
        }),
    });
    const data = await response.json();
    dispatch(setUser(data));
    return response;
};

export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE',
    });
    dispatch(removeUser());
    return response;
};

// THUNK action creator for getting/display all available spots 
export const getAllSpots = () => async dispatch => {
    const response = await fetch(`/api/spots`);

    if (response.ok) {
        const spots = await response.json();
        dispatch(displayAllSpots(spots));
    }
}

// STATE OBJECT ---------------------------------------------------------

const initialState = { user: null };

// ---------------------------------------------------------------------

const sortSpot = (spots) => {
    return spots.sort((spotA, spotB) => {
        return spotA - spotB;
    }).map((spot) => spot.id);
};

// REDUCER--------------------------------------------------------------

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {

        case SET_USER:
            newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState;

        case REMOVE_USER:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;

        case GET_ALL_SPOTS:
            newState = {};
            action.spots.forEach(spot => {
                newState[spot.id] = spot;
            });
            return {
                ...newState,
                ...state,
                spot: sortSpot(action.spot)
            }

        default:
            return state;
    }
};


// ----------------------------------------------------------------------
export default sessionReducer;