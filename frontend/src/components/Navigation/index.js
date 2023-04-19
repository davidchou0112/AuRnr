// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import CreateSpotFormModal from '../CreateSpotFormModal';
import { useEffect, useState } from 'react';

import './Navigation.css';


function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <div>
                <CreateSpotFormModal />
                <ProfileButton user={sessionUser} />
            </div>
        );
    } else {
        sessionLinks = (
            <>
                <LoginFormModal />
                <SignupFormModal />
            </>
        );
    }

    return (
        <div className='nav-bar'>

            <NavLink exact to="/">
                <img className='icon' src="https://drive.google.com/uc?export=view&id=1oKqO6s967Pf7IfphJ4LP_R8GYQfc2a4U" alt='favicon.png' />
            </NavLink>

            <div>
                {isLoaded && sessionLinks}
            </div>

        </div >

    );
}

export default Navigation;