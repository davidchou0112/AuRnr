import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

import './CreateSpotForm.css';

function CreateSpotForm() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);

    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')

    if (!sessionUser) return <Redirect to='/' />;

    const handleSubmit = (e) => {

    }

}

export default CreateSpotForm;