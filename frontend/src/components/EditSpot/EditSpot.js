import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import { actionGetOneSpot, actionUpdateSpot } from '../../store/spots';

import './EditSpot.css';

const EditSpotForm = ({ spotId }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    // console.log(spotId, `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~spotId from EditSpot`)
    const spot = useSelector(state => state.spots.singleSpot);
    // console.log(spot, `~~~~~~~~~this is 'spot' from EditSpot`)

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    // const [lat, setLat] = useState();
    // const [lng, setLng] = useState();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [url, setUrl] = useState('');

    useEffect(() => {
        dispatch(actionGetOneSpot(spotId));
    }, [dispatch, spotId]);

    // console.log(actionGetOneSpot(spotId))

    // will auto re render again
    useEffect(() => {
        if (spot) {
            setAddress(spot.address);
            setCity(spot.city);
            setState(spot.state);
            setCountry(spot.country);
            // setLat(spot.lat);
            // setLng(spot.lng);
            setName(spot.name);
            setDescription(spot.description);
            setPrice(spot.price);
            // setUrl(spot.SpotImages[0]['url']);
            // console.log(spot.SpotImages[0]['url'], `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`)
        }
    }, [spot]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // payload = spots
        const spots = {
            id: spotId,
            address,
            city,
            state,
            country,
            // lat,
            // lng, 
            name,
            description,
            price,
            url
        }

        let newSpot = await dispatch(actionUpdateSpot(spots, spotId));
        // let newSpot = await actionUpdateSpot(spots, spots.id);

        if (newSpot) {

            history.push(`/spots/${spotId}`);

        }
    }

    const handleCancelClick = (e) => {
        e.preventDefault();
        history.push('/');
    };


    // if (!spot.address) {
    //     return 'Loading...'
    // } else {
    return (
        <section className="entire-form">
            <div className='formLabel' >Edit a Spot</div>
            <form onSubmit={handleSubmit} className="Edit-form" >
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

                <label className='input-label'>
                    <input className="input"
                        type="test"
                        placeholder="Image Url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </label >

                {/* <label className="preview-image-label" > Preview Image?
                    <select className='true-false' onChange={(e) => setPreview(e.target.value)}>
                        <option key='true'>true</option>
                        <option key='false'>false</option>
                    </select >
                </label> */}

                <button className="button" type="submit">Edit Spot</button>
                <button className="button" onClick={handleCancelClick} type="button">Cancel</button>
            </form >
        </section >
    )

}
// }
export default EditSpotForm;