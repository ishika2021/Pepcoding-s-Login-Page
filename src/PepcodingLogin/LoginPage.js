import React, { useState } from 'react'
import firebase from './Firebase';
import './LoginPageStyle.css'
import googleLogo from './google-icon.png';

function LoginPage() {
    const auth = firebase.auth();
    const provider = new firebase.auth.GoogleAuthProvider();
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPass] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [signUp, setSignUp] = useState(false);
    const HandleNormalSignIn = async () => {
        try {
            // console.log(email," ",password);
            setLoading(true);
            let res = await auth.signInWithEmailAndPassword(email, password);
            console.log(res.user);
            setUser(res.user);
            setLoading(false);
        } catch (e) {
            setError(e.message);
            setTimeout(() => {
                setError('');
            }, 2000);
            setLoading(false);
        }
        setEmail('');
        setPassword('');
    }
    const HandleSignOUt = async () => {
        try {
            setLoading(true);
            let res = await auth.signOut();
            setUser(null);
            setLoading(false);
        } catch (e) {
            setError(e.message);
            setTimeout(() => {
                setError('');
            }, 2000);
            setLoading(false);
        }
    }
    const HandleGoogleSignIn = async () => {
        try {
            setLoading(true);
            let res = await auth.signInWithPopup(provider);
            setUser(res.user);
            setLoading(false);
        } catch (e) {
            setError(e.message);
            setTimeout(() => {
                setError('');
            }, 2000);
            setLoading(false);
        }
    }
    const HandleCreateAccount = () => {
        setSignUp(true);
    }
    const HandleSignInText =()=>{
        setSignUp(false);
    }
    const HandleSignUp = async () => {
        try {
            if (password === confirmPassword) {
                setLoading(true);
                let res = await auth.createUserWithEmailAndPassword(email, password);
                setUser(res.user);
                setLoading(false);
                setSignUp(false);
            } else {
                alert("Password doesn't match");
            }
        } catch (e) {
            setError(e.message);
            setTimeout(() => {
                setError('');
            }, 2000);
            setLoading(false);
        }
    }
    return (
        <>
            {signUp ? <>
                <div className='SignUpBox'>
                    <div className='SignUpInnerBox'>
                        <h1>SIGN IN</h1>
                        <div className="row">
                            <h5 className="lightText">Or </h5>
                            <h5 className="boldText" onClick={HandleSignInText}>SignIn</h5>
                        </div>
                        <div className="row input_row">
                            <input type="text" placeholder="Name" className="input-field" onChange={(e) => { setUser(e.target.value) }} />
                        </div>
                        <div className="row input_row">
                            <input type="email" placeholder="email" className="input-field" onChange={(e) => { setEmail(e.target.value) }} />
                        </div>
                        <div className="row input_row">
                            <input type="password" placeholder="Password" className="input-field" onChange={(e) => { setPassword(e.target.value) }} />
                        </div>
                        <div className="row input_row">
                            <input type="password" placeholder="Confirm Password" className="input-field" onChange={(e) => { setConfirmPass(e.target.value) }} />
                        </div>
                        <div className="row input_row signUnBtn row2" >
                            <button type="submit" className="input-field" onClick={HandleSignUp}>SIGNUP</button>
                        </div>
                        <div className="row row2">
                            <h5 className="lightText"> Or continue with</h5>
                        </div>
                        <div className="row row2">
                            <button type="submit" className="input-field googleLoginBtn">
                                <img className="googleLogo" src={googleLogo} />
                                <span className="googleSignInText">Sign in</span>
                            </button>
                        </div>
                        <div className="row row2">
                            <h5 className="lightText">forgot your password?</h5>
                        </div>
                    </div>
                </div>
            </>
                :
                <>
                    {loading ? "Loading...Please Wait" : user == null ?
                        <div className='loginBox'>
                            <div className='loginInnerBox'>
                                <h1>SIGN IN</h1>
                                <div className="row">
                                    <h5 className="lightText">Or </h5>
                                    <h5 className="boldText" onClick={HandleCreateAccount}>Create an account</h5>
                                </div>
                                <div className="row input_row">
                                    <input type="email" placeholder="email" className="input-field" onChange={(e) => { setEmail(e.target.value) }} />
                                </div>
                                <div className="row input_row">
                                    <input type="password" placeholder="Password" className="input-field" onChange={(e) => { setPassword(e.target.value) }} />
                                </div>
                                <div className="row input_row signInBtn">
                                    <button type="submit" className="input-field" onClick={HandleNormalSignIn}>SIGN IN</button>
                                </div>
                                <div className="row">
                                    <h5 className="lightText"> Or continue with</h5>
                                </div>
                                <div className="row ">
                                    <button type="submit" className="input-field googleLoginBtn" onClick={HandleGoogleSignIn}>
                                        <img className="googleLogo" src={googleLogo} />
                                        <span className="googleSignInText">Sign in</span>
                                    </button>
                                </div>
                                <div className="row">
                                    <h5 className="lightText">forgot your password?</h5>
                                </div>
                            </div>
                        </div> :
                        <>
                            <h1>Logged IN</h1>
                            <div className="row input_row signInBtn">
                                <button type="submit" className="input-field" onClick={HandleSignOUt}>SIGN OUT</button>
                            </div>
                        </>
                    }
                </>}

        </>
    )
}

export default LoginPage
