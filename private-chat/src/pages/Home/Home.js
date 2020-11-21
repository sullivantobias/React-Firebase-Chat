import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';

import './styles.scss';

export const HomePage = () => {
    return (
        <div className='cmp-home'>
            <Header/>
            <section className='cmp-home__content'>
                <h1 className='cmp-home__content--title'>Welcome to Private Chat</h1>
                <p className='cmp-home__content--paragraph'>A great place to share your thoughts with friends</p>
                <div className='cmp-home__content__links'>
                    <Link className='cmp-home__content__links--signup' to='/signup'>Create New Account</Link>
                    <Link className='cmp-home__content__links--signin' to='/login'>Login to Your Account</Link>
                </div>
            </section>
            <Footer/>
        </div>
    )
};
