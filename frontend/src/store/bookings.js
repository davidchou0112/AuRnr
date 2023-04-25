import { csrfFetch } from "./csrf";

const LOAD_BOOKINGS = 'bookings/getall'
const LOAD_USER_BOOKINGS = 'bookings/user'
const CREATE_BOOKING = 'bookings/new'
const EDIT_BOOKING = 'bookings/edit'
const DELETE_BOOKING = 'bookings/delete'


const loadBookings = (bookings) => {
    return {
        type: LOAD_BOOKINGS,
        bookings
    }
}

const loadUserBookings = (bookings) => {
    return {
        type: LOAD_USER_BOOKINGS,
        bookings
    }
}

const createBooking = (booking) => {
    return {
        type: CREATE_BOOKING,
        booking
    }
}

const editBooking = (booking) => {
    return {
        type: EDIT_BOOKING,
        booking
    }
}

const deleteBooking = (bookingId) => {
    return {
        type: DELETE_BOOKING,
        bookingId
    }
}


//thunks
export const fetchAllBookings = (spotId) => async (dispatch) => {
    const res = await fetch(`/api/spots/${spotId}/bookings`)
    if (res.ok) {
        const spotBookings = await res.json()

        dispatch(loadBookings(spotBookings))
    }
}

export const fetchUserBookings = () => async (dispatch) => {
    const res = await csrfFetch(`/api/bookings/current`)
    if (res.ok) {
        const userBookings = await res.json()
        dispatch(loadUserBookings(userBookings))
    }
}

export const createBookingThunk = (spotId, payload) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
    // const newBooking = await res.json()
    // dispatch(createBooking(newBooking))

    if (res.status < 400) {
        const newBooking = await res.json()
        dispatch(createBooking(newBooking))
        return res
    }
    else {
        const errorRes = await res.json()
        console.log('thunk got here qqqqqqqqqqqqqqqqq', errorRes)
        return res
    }
}

export const editBookingThunk = (bookingId, payload) => async (dispatch) => {
    const res = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
    if (res.ok) {
        const editedBooking = await res.json()
        dispatch(editBooking(editedBooking))
    }
}


export const deleteBookingThunk = (bookingId) => async (dispatch) => {
    const res = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE'
    })
    if (res.ok) {
        dispatch(deleteBooking(bookingId))
    }
}



//reducer
const initialState = {
    allBookings: {},
    userBookings: {},
    singleBooking: {}
}

const bookingReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case LOAD_BOOKINGS:
            newState = { ...state, allBookings: {} }
            action.bookings.Bookings.forEach((booking) => newState.allBookings[booking.id] = booking)
            return newState

        case LOAD_USER_BOOKINGS:
            newState = { ...state, userBookings: {} }
            action.bookings.Bookings.forEach((booking) => newState.userBookings[booking.id] = booking)
            return newState

        case CREATE_BOOKING:
            newState = { ...state, allBookings: { ...state.allBookings } }
            newState.allBookings[action.booking.id] = action.booking
            return newState

        default:
            return state;
    }

}


export default bookingReducer
