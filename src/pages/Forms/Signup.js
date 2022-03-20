import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signInWithGitHub, signInWithGoogle, signup } from "../../helpers/auth";

export const SignUp = () => {

    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [avatar, setAvatar] = useState({});
    const [password, setPassword] = useState('');

    const handleChange = event => {
        event.target.name === 'email' && setEmail(event.target.value);
        event.target.name === 'password' && setPassword(event.target.value);
        event.target.name === 'displayName' && setDisplayName(event.target.value);
        event.target.name === 'avatar' && setAvatar(event.target.files[0]);
    };

    const handleSubmit = async event => {
        event.preventDefault();
        setError('');

        try {
            await signup(email, password, displayName, avatar);
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
                    Sign up to
                    <Link to='/'>
                        Private Chat
                    </Link>
                </h1>
                <p className='cmp-form__container--paragraph'>
                    Fill in the form below to register an account.
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
                    placeholder='Display Name'
                    name='displayName'
                    type='text'
                    onChange={ handleChange }
                    value={ displayName }
                />
                <input
                    className='cmp-form__container--input'
                    placeholder='Password'
                    name='password'
                    onChange={ handleChange }
                    value={ password }
                    type='password'
                />
                <input
                    className='cmp-form__container--input'
                    placeholder='Avatar'
                    name='avatar'
                    onChange={ handleChange }
                    type='file'
                />
                <>
                    { error ? (
                        <p className='cmp-form__container--paragraph'>{ error }</p>
                    ) : null }
                    <div className='cmp-form__container--submit'>
                        <button type='submit'>Sign up</button>
                    </div>
                </>
                <p className='cmp-form__container--paragraph'>You can also sign up with any of these services</p>
                <button type='button' onClick={ googleSignIn }>
                    Sign up with Google
                </button>
                <button type='button' onClick={ githubSignIn }>
                    Sign up with GitHub
                </button>
                <hr/>
                <p>
                    Already have an account? <Link to='/login'>Sign in</Link>
                </p>
            </form>
        </div>
    )
};
