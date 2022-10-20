// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import CreateSpotFormModal from '../CreateSpotFormModal';
// import EditSpotForm from '../EditSpot/EditSpot';


import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <div>
                {/* <EditSpotForm /> */}
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
            <div className='nav-home-profile'>

                <div>
                    <NavLink exact to="/spots">Home</NavLink>
                </div>
                <div>
                    {isLoaded && sessionLinks}
                </div>

            </div>
        </div>

    );
}

export default Navigation;