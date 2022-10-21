// frontend/src/components/SignupFormModal/index.js
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as sessionActions from '../../store/session';

import './SignupForm.css';

function SignupForm() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to='/' />;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({
                firstName,
                lastName,
                email,
                username,
                password
            }))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
        <section className="entire-form">
            <div className='formLabel'>Sign Up</div>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label className='input-label'>

                    <input className="input-field"
                        type='text'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        placeholder='First Name'
                    />
                </label>
                <label className='input-label'>

                    <input className="input-field"
                        type='text'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        placeholder='Last Name'

                    />
                </label>
                <label className='input-label'>

                    <input className="input-field"
                        type='text'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder='Email'

                    />
                </label>
                <label className='input-label'>

                    <input className="input-field"
                        type='text'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        placeholder='Username'

                    />
                </label>
                <label className='input-label'>

                    <input className="input-field"
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder='Password'

                    />
                </label>
                <label className='input-label'>

                    <input className="input-field"
                        type='password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        placeholder='Confirm Password'

                    />
                </label>
                <button className="button" type='submit'>Sign Up</button>
            </form>
        </section>
    );
}

export default SignupForm;