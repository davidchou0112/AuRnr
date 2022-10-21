// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import CreateSpotFormModal from '../CreateSpotFormModal';
// import EditSpotFormModal from '../EditSpot';

import './Navigation.css';


function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <div>
                <CreateSpotFormModal />
                <ProfileButton user={sessionUser} />
                {/* <EditSpotFormModal user={sessionUser} /> */}
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
            <div className='nav-home-profile'>

                <div>
                    <NavLink exact to="/">Home</NavLink>
                </div>
                <div>
                    {isLoaded && sessionLinks}
                </div>

            </div>
        </div>

    );
}

export default Navigation;