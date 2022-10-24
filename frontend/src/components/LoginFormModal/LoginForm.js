// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';

import './LoginForm.css';

function LoginForm() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    // validation test
    // const [errors, setErrors] = useState(false);

    // Creating a demo user button for quicker login
    const [passwordError, setPasswordError] = useState('')
    const [credentialError, setCredentialError] = useState('')


    const demoUserButton = (e) => {
        // setPasswordError('');
        // setCredentialError('');
        setCredential('Demo-lition');
        setPassword('password');
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password })).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(Object.values(data.errors));
            }
        );
    };

    return (
        <section className='entire-form'>
            <div className='formLabel'>Log In</div>
            <form onSubmit={handleSubmit}>
                <ul className='errorHandling'>
                    {errors?.map((error) => (
                        <li key={error}>{error}</li>
                    ))}
                </ul>
                <div className='label-and-input'>
                    <label className='input-label'>

                    </label>
                    <input className='input-field'
                        type='text'
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                        placeholder='Username or Email'
                    />
                    <label className='input-label'>

                    </label>
                    <input className='input-field'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder='Password'
                    />
                    <button className='buttons-login' type='submit'>Log In</button>
                    <button className='buttons-login' type='submit' onClick={demoUserButton}>Demo User Log In</button>
                </div>
            </form>
        </section>
    );
}

export default LoginForm;