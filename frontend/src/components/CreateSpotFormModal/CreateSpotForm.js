import { useState } from "react";
import { useDispatch } from "react-redux";
// import { Redirect } from "react-router-dom";
// import * as sessionActions from "../../store/spots";

import { useHistory } from "react-router-dom";
import { actionAddOneSpot } from "../../store/spots";

import './CreateSpotForm.css';

function CreateSpotForm() {
    const dispatch = useDispatch();
    // const sessionUser = useSelector((state) => state.session.user);
    const history = useHistory();

    // const [showModal, setShowModal] = useState(true);


    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    // const [lat, setLat] = useState('')
    // const [lng, setLng] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')


    const handleSubmit = async (e) => {
        // console.log('a;lsdkjfao;isdjfaoisdjfasldf')
        e.preventDefault();
        const spotInfo = {
            address,
            city,
            state,
            country,
            // lat,
            // lng,
            name,
            description,
            price
        }
        // let newSpot = await dispatch(sessionActions.actionAddOneSpot(spotInfo))
        let newSpot = await actionAddOneSpot(spotInfo)(dispatch)
        // dispatch(newSpot);
        // dispatch(actionAddOneSpot(spotInfo))


        if (newSpot) {
            window.location.reload();
            // hideForm()
        }
        history.push('/');
    };


    const handleCancelClick = (e) => {
        e.preventDefault();
        history.push('/');
        // hideForm(true);
        // setShowModal(false);
        // console.log(setShowModal(), 'this is setShowModal() on console log ------------------------')
    };


    return (
        <section className="entire-form">
            <form onSubmit={handleSubmit} className="create-spot-form" >
                <label className='input-label'>
                    <input className="input"
                        type="text"
                        placeholder="Address"
                        min="1"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </label>

                <label className='input-label'>
                    <input className="input"
                        type="text"
                        placeholder="City"
                        min="0"
                        max="100"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </label>

                <label className='input-label'>
                    <input className="input"
                        type="text"
                        placeholder="State"
                        min="0"
                        max="100"
                        required
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    />
                </label >

                <label className='input-label'>
                    <input className="input"
                        type="text"
                        placeholder="Country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </label >

                {/* <label> Latitude
                    <input
                    type="number"
                        placeholder="Latitude"
                        value={lat}
                        onChange={(e) => setLat(e.target.value)}
                        />
                        </label>
                        
                        <label> Longitude
                        <input
                        type="number"
                        placeholder="Longitude"
                        value={lng}
                        onChange={(e) => setLng(e.target.value)}
                        />
                    </label> */}

                <label label className='input-label'>
                    < input className="input"
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)
                        }
                    />
                </label >

                <label className='input-label'>
                    <input className="input"
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label >

                <label className='input-label'>
                    <input className="input"
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </label >

                <button className="button" type="submit">Create new Spot</button>
                <button className="button" onClick={handleCancelClick} type="button">Cancel</button>
            </form >
            {/* <button onClick={() => setShowModal(false)}>Cancel</button> */}
        </section >

    )

}

export default CreateSpotForm;