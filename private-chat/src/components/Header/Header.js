import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../services/firebase';
import { logout } from "../../helpers/auth";

import './styles.scss';

const Header = () => {
    return (
        <header className='cmp-header'>
            <nav className='cmp-header__nav'>
                <Link className='cmp-header__nav--link' to='/'>Private Chat</Link>
                <div className='cmp-header__nav__profile'>
                    { auth().currentUser
                    && <>
                        <img className='cmp-header__nav__profile--avatar' alt='profilePicture' src={ auth().currentUser.photoURL }/>
                        <button onClick={ () => logout() }>Logout</button>
                    </>
                    }
                </div>
            </nav>
        </header>
    );
};

export default Header;
