import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signin, signInWithGitHub, signInWithGoogle } from "../../helpers/auth";

import './styles.scss';

export const Login = () => {
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = event => {
        event.target.name === 'email' && setEmail(event.target.value);
        event.target.name === 'password' && setPassword(event.target.value);
    };

    const handleSubmit = async event => {
        event.preventDefault();

        setError('');

        try {
            await signin(email, password);
        } catch (error) {
            setError(error.message);
        }
    };

    const googleSignIn = async () => {
        try {
            await signInWithGoogle();
        } catch (error) {
            setError(error.message);
        }
    };

    const githubSignIn = async () => {
        try {
            await signInWithGitHub();
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className='cmp-form'>
            <form
                className='cmp-form__container'
                autoComplete='off'
                onSubmit={ handleSubmit }
            >
                <h1 className='cmp-form__container--title'>
                    Login to
                    <Link className='' to='/'>
                        Private Chat
                    </Link>
                </h1>
                <p className='cmp-form__container--paragraph'>
                    Fill in the form below to login to your account.
                </p>
                <input
                    className='cmp-form__container--input'
                    placeholder='Email'
                    name='email'
                    type='email'
                    onChange={ handleChange }
                    value={ email }
                />
                <input
                    className='cmp-form__container--input'
                    placeholder='Password'
                    name='password'
                    onChange={ handleChange }
                    value={ password }
                    type='password'
                />
                <>
                    { error ? (
                        <p className='cmp-form__container--paragraph'>{ error }</p>
                    ) : null }
                    <div className='cmp-form__container--submit'>
                        <button type='submit'>Login</button>
                    </div>
                </>
                <p className='cmp-form__container--paragraph'>You can also log in with any of these services</p>
                <button type='button' onClick={ googleSignIn }>
                    Sign in with Google
                </button>
                <button type='button' onClick={ githubSignIn }>
                    Sign in with GitHub
                </button>
                <hr/>
                <p>
                    Don't have an account? <Link to='/signup'>Sign up</Link>
                </p>
            </form>
        </div>
    );
};
