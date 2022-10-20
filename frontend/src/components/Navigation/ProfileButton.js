// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink } from "react-router-dom";
// import EditSpotFormModal from "../EditSpot";

// import { useSelector } from 'react-redux';
// import CreateSpotFormModal from '../CreateSpotFormModal';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);


    // const sessionUser = useSelector(state => state.session.user);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };


    return (
        <>
            <button onClick={openMenu}>
                <i className="fas fa-user-circle" />
            </button>
            {showMenu && (
                <ul className="profile-dropdown">

                    <p>
                        {user.username}
                    </p>


                    <p>
                        {user.email}
                    </p>

                    <p>
                        <NavLink to="/current">
                            <button className="logout-button">
                                My Spots
                            </button>
                        </NavLink>
                    </p>

                    <p>
                        <button onClick={logout}>Log Out</button>
                    </p>

                </ul>
            )}
        </>
    );
}

export default ProfileButton;