import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/spots";
import { useHistory } from "react-router-dom";

import './CreateSpotForm.css';

function CreateSpotForm() {
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
            // hideForm()
        }
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        // hideForm();
    };


    return (
        <section className="new-form-holder centered middled">
            <form className="create-spot-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Address"
                    min="1"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="City"
                    min="0"
                    max="100"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="State"
                    min="0"
                    max="100"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Latitude"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Longitude"
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <button type="submit">Create new Spot</button>
                <button type="button" onClick={handleCancelClick}>Cancel</button>
            </form>
        </section>

    )

}

export default CreateSpotForm;