// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import CreateSpotFormModal from '../CreateSpotFormModal';
import { useEffect, useState } from 'react';



// import EditSpotFormModal from '../EditSpot';

import './Navigation.css';
// import CreateReviewFormModal from '../CreateReviewFormModal';


function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);


    // const [showMenu, setShowMenu] = useState(false)


    // // const openMenu = () => {
    // //   if (showMenu) return;
    // //   setShowMenu(true);
    // // };


    // const dropdown = () => {
    //     if (showMenu) {
    //         return 'show-drop-menu'
    //     } else {
    //         return 'hide-drop-menu'
    //     }
    // }

    // useEffect(() => {
    //     if (!showMenu) return;

    //     const closeMenu = () => {
    //         setShowMenu(false);
    //     };

    //     document.addEventListener('click', closeMenu);

    //     return () => document.removeEventListener("click", closeMenu);
    // }, [showMenu]);




    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <div>
                {/* <CreateReviewFormModal /> */}
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
            {/* <div className='nav-home-profile'> */}

            <NavLink exact to="/">
                <img className='icon' src="https://drive.google.com/uc?export=view&id=1oKqO6s967Pf7IfphJ4LP_R8GYQfc2a4U" alt='favicon.png' />


            </NavLink>

            <div>
                {isLoaded && sessionLinks}
            </div>

            {/* </div>  */}
        </div >

    );
}

export default Navigation;