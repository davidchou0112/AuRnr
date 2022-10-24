import { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { Redirect } from 'react-router-dom';
// import * as sessionActions from '../../store/spots';
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { actionAddOneSpot } from '../../store/spots';

import './CreateSpotForm.css';



function CreateSpotForm({ setShowModal }) {
    const dispatch = useDispatch();
    // const sessionUser = useSelector((state) => state.session.user);
    const history = useHistory();

    // const [showModal, setShowModal] = useState(true);


    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    // const [lat, setLat] = useState('');
    // const [lng, setLng] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    // for adding images
    const [url, setUrl] = useState('');
    // const [preview, setPreview] = useState('');
    const [validations, setValidations] = useState([]);
    const [errors, setErrors] = useState(false);


    // Error handling
    useEffect(() => {
        const errors = [];
        if (!address || address.length > 30) errors.push("Address is required and must be less than 20 characters")
        if (!city || city.length > 15) errors.push("City is required and must be less than 15 characters")
        if (!state || state.length > 10) errors.push("State is required and must be less than 10 characters")
        if (!country || country.length > 20) errors.push("Country is required and must be less than 15 characters")
        // if (!lat) errors.push('Lat is required')
        // if (!lng) errors.push('Lng is required')
        if (!name || name.length > 10) errors.push("Name is required and must be less than 20 characters")
        if (!description || description.length > 250) errors.push("Description is required and must be be less than 250 characters")
        if (!price || price < 1) errors.push('Price per day has to be greater than 0')
        if (!url.match(/\.(img|jpg|jpeg|png)$/)) errors.push("Please enter a URL ending with img, jpg, jpeg or png")
        setValidations(errors)

    }, [address, city, state, country, name, description, price, url])


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(true)
        if (!validations.length) {
            const spotInfo = {
                address,
                city,
                state,
                country,
                // lat,
                // lng,
                name,
                description,
                price,
                url,
                preview: true
            }

            const imgInfo = { url, preview: true };

            // let newSpot = await dispatch(sessionActions.actionAddOneSpot(spotInfo))
            let newSpot = await actionAddOneSpot(spotInfo, imgInfo)(dispatch)
            // dispatch(newSpot);
            // dispatch(actionAddOneSpot(spotInfo))

            // console.log(imgInfo, '!!!!!!!this is imgInfo~~~~~~~~~~~~~~~~~~~~~~~~~~')
            // console.log(newSpot, '@@@@@@@@@this is newSpot~~~~~~~~~~~~~~~~~~~~~~~~~~')

            if (newSpot) {
                // console.log('did it reach this ~~~~~~~~~~~~~~~~~~~~~~~~~~createspotform')
                // console.log('this is new spot~~~', newSpot)
                // window.location.reload();
                history.push(`/spots/${newSpot.id}`);
                setShowModal(false)
                setErrors(false)
            }
        };
    }



    const handleCancelClick = (e) => {
        e.preventDefault();
        history.push('/');

        setShowModal(false);
    };


    return (
        <div className='modalForm'>
            <section className='entire-form'> Create New Spot
                {errors &&
                    <ul className="errorHandling">
                        {validations.length > 0 &&
                            validations.map(error => (
                                <li key={error}>{error}</li>
                            ))}
                    </ul>
                }
                <form onSubmit={handleSubmit} className='create-spot-form' >
                    <label className='input-label'>
                        <input className='input-field'
                            type='text'
                            placeholder='Address'
                            min='1'
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </label>
                    {/* {!address.length && <div className="errorHandling">Street address is required</div>} */}

                    <label className='input-label'>
                        <input className='input-field'
                            type='text'
                            placeholder='City'
                            min='0'
                            max='100'
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </label>
                    {/* {!city.length && <div className="errorHandling">City is required</div>} */}

                    <label className='input-label'>
                        <input className='input-field'
                            type='text'
                            placeholder='State'
                            min='0'
                            max='100'
                            required
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        />
                    </label >
                    {/* {!state.length && <div className="errorHandling">State is required</div>} */}

                    <label className='input-label'>
                        <input className='input-field'
                            type='text'
                            placeholder='Country'
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                    </label >
                    {/* {!country.length && <div className="errorHandling">Country is required</div>} */}

                    {/* <label> Latitude
                    <input
                    type='number'
                        placeholder='Latitude'
                        value={lat}
                        onChange={(e) => setLat(e.target.value)}
                        />
                        </label>
                        //  {!lat && <div className = "errorHandling">Lat is required</div> }

                        <label> Longitude
                        <input
                        type='number'
                        placeholder='Longitude'
                        value={lng}
                        onChange={(e) => setLng(e.target.value)}
                        />
                    </label> 
                    // {!lng && <div className = "errorHandling">Lng is required</div> } */}

                    <label label className='input-label'>
                        < input className='input-field'
                            type='text'
                            placeholder='Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)
                            }
                        />
                    </label >
                    {/* {!name.length && <div className="errorHandling">Name is required</div>} */}

                    <label className='input-label'>
                        <input className='input-field'
                            type='text'
                            placeholder='Description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label >
                    {/* {!description.length && <div className="errorHandling">Description is required</div>} */}

                    <label className='input-label'>
                        <input className='input-field'
                            type='number'
                            placeholder='Price'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </label >
                    {/* {price < 1 && <div className="errorHandling">No Free Stays</div>} */}
                    {/* {!price && <div className="errorHandling">Price is required, no free stays</div>} */}


                    <label className='input-label'>
                        <input className='input-field'
                            type='test'
                            placeholder='Image Url'
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </label >
                    {/* {!url && <div className="errorHandling">Please enter a URL ending with img, jpg, jpeg or png</div>} */}

                    {/* <label className='preview-image-label' > Preview Image?
                    <select className='true-false' onChange={(e) => setPreview(e.target.value)}>
                        <option key='true'>true</option>
                        <option key='false'>false</option>
                    </select >
                </label> */}

                    <button className='button' type='submit'>Create new Spot</button>
                    <button className='button' onClick={handleCancelClick} type='button'>Cancel</button>
                </form >
            </section >
        </div>

    )

}

export default CreateSpotForm;