import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/spots";
import { useHistory } from "react-router-dom";

import './CreateSpotForm.css';

function CreateSpotForm({ hideForm }) {
    const dispatch = useDispatch();
    // const sessionUser = useSelector((state) => state.session.user);
    const history = useHistory();

    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        const spotInfo = {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        }
        let newSpot = await dispatch(sessionActions.actionAddOneSpot(spotInfo))

        if (newSpot) {
            history.push(`/spots/${newSpot.id}`);
            hideForm()
        }
    };

    cost handleCancelClick = (e)

}

export default CreateSpotForm;