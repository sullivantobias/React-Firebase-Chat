import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signInWithGitHub, signInWithGoogle, signup } from "../helpers/auth";

export const SignUp = () => {

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
            await signup(email, password);
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
        <div className="container">
            <form className="mt-5 py-5 px-5" onSubmit={ handleSubmit }>
                <h1>
                    Sign Up to
                    <Link className="title ml-2" to="/">Private Chat</Link>
                </h1>
                <p className="lead">Fill in the form below to create an account.</p>
                <div className="form-group">
                    <input className="form-control" placeholder="Email" name="email" type="email"
                           onChange={ handleChange } value={ email }/>
                </div>
                <div className="form-group">
                    <input className="form-control" placeholder="Password" name="password"
                           onChange={ handleChange } value={ password } type="password"/>
                </div>
                <div className="form-group">
                    { error ? <p className="text-danger">{ error }</p> : null }
                    <button className="btn btn-primary px-5" type="submit">Sign up</button>
                </div>
                <p>You can also sign up with any of these services</p>
                <button className="btn btn-danger mr-2" type="button" onClick={ googleSignIn }>
                    Sign up with Google
                </button>
                <button className="btn btn-secondary" type="button" onClick={ githubSignIn }>
                    Sign up with GitHub
                </button>
                <hr/>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </form>
        </div>
    )
};
