// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink, useHistory } from 'react-router-dom';
// import EditSpotFormModal from '../EditSpot';

// import { useSelector } from 'react-redux';
// import CreateSpotFormModal from '../CreateSpotFormModal';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const history = useHistory();
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

        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        history.push('/')
    };


    // const sessionUser = useSelector(state => state.session.user);
    // let sessionLinks
    // if (sessionUser) {
    //     sessionLinks = (
    //         <div>
    //             <CreateSpotFormModal />
    //         </div>
    //     );
    // }

    if (!user.username) {
        return 'Refresh'
    } else {
        return (
            <>
                <button onClick={openMenu}>
                    <i className='fas fa-user-circle' />
                </button>

                {showMenu && (
                    <ul className='profile-dropdown'>

                        <p className='options'>
                            {user.username}
                        </p>


                        <p className='options'>
                            {user.email}
                        </p>

                        <p className='options' >
                            <NavLink to='/current' >
                                <button className=''>
                                    My Spots
                                </button>
                            </NavLink>
                        </p>

                        <p className='options' >
                            <NavLink to='/my-reviews' >
                                <button className=''>
                                    My Reviews
                                </button>
                            </NavLink>
                        </p>

                        <p className='options'>
                            <button onClick={logout}>Log Out</button>
                        </p>

                    </ul>
                )}
            </>
        );
    }


}

export default ProfileButton;