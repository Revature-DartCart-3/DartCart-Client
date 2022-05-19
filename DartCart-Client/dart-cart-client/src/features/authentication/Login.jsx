import { Modal, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { homeRedirect, loginUser, selectStatus, selectUser, fetchSeller, logout } from "../../common/slices/authSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../common/hooks";
import { fetchCart } from "../../common/slices/cartSlice";
import axios from "axios";
import authHeader from "../../features/authentication/AuthHeader";
import { createAsyncThunk } from '@reduxjs/toolkit';
import LoadingIcons from 'react-loading-icons';
import { Redirect } from "react-router-dom";

import "./protect_btn.css";


// Change URL for testing vs. production
const API_URL = process.env.REACT_APP_API_URL;

function ShowEmailSentModal(props) {
    let showThis = props.show;
    let error = props.error;

    const handleClose = () => {
        showThis = false;
        props.parentCallback();
    }
    return(
        <Modal show={showThis} onHide={handleClose}>
            <Modal.Header closeButton style={{ backgroundColor:"#198754", color:"#fff"}}>
                <Modal.Title >Reset Password</Modal.Title>
            </Modal.Header>
            
            <Modal.Body>
                {!error ?
                    (<div className="">
                        <p>Reset password instructions have been sent to the email associated with this account</p>
                        <br />
                        <p>If you do not see the email check your spam folder</p>
                    </div>) :
                    (<div className="">
                        <p>{props.error} <br /> Reset password email not sent.</p>
                    
                    </div>)}
            </Modal.Body>
        </Modal>
    );
}

function CollectEmailForPasswordResetModal(props) {
    const [username, setUsername] = useState("");

    let showThis = props.show; 
    
    const handleClose = () => {
        showThis = false;
        props.parentCallback("");
    }

    const emailResetPasswordLink = () => {
        showThis = false;
        props.parentCallback(username);        
    }

    return(
        <>
            <Modal show={showThis} onHide={handleClose} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Reset Password</Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    <div className="">
                        <input
                            type="text"
                            placeholder="Enter Username to Reset Password"
                            className="form-control form-control-md"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>     
                </Modal.Body>
            <Modal.Footer> 
                <Button onClick={emailResetPasswordLink}>Reset Password</Button>
            </Modal.Footer>
            </Modal>    
        </>
    );
}

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    // component state for reset password
    const [showResetModal, setShowResetModal] = useState(false);
    const [showEmailSent, setShowEmailSent] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [showSendingEmail, setShowSendingEmail] = useState(false);

    const nav = useNavigate();
    const dispatch = useAppDispatch();
    const status = useSelector(selectStatus);
    const stateUser = useSelector(selectUser);
    let user = JSON.parse(stateUser);

    useEffect(() => {
        if (status === "failure") setError("Wrong username or password.");
    }, [status]);

    useEffect(() => {}, [status]);

    const handleLogin = async () => {
        await dispatch(loginUser({ username, password }));
        setError("");
        setShowModal(true);
    };

    const handleLogout = () => {
        dispatch(logout(null));
    };

    const handleClose = () => {
        setShowModal(false);
        dispatch(fetchSeller(user.id));
        dispatch(homeRedirect(null));
        nav("/");
    };

    // methods for reset password
    const showResetPasswordModal = () => {
        setShowResetModal(true);
    }

    const hideResetPasswordModal = (username) => {
        if(username) {
            setUsername(username);
            setShowResetModal(false);
            setShowSendingEmail("show");

            axios.get(API_URL + "resetpass/" + username )
            .then((response) => {
                setShowSendingEmail(false);
                setEmailError("");
                setShowEmailSent(true);
            })
            .catch((error) => {
                if(error.response) {
                    setShowSendingEmail(false);
                    setEmailError(error.response.status+". Unable to locate "+ username+".");
                    setShowEmailSent(true);
                }
                else if (error.request) {
                    setShowSendingEmail(false);
                    setEmailError("Unable to reach Server.");
                    setShowEmailSent(true);
                }
                else {
                    setShowSendingEmail(false);
                    setEmailError("Unable to complete request.");
                    setShowEmailSent(true);                }
            });
            console.log(error.config);

        }
        else { // just closing the modal
            setShowResetModal(false);
        }
    }

    const hideEmailSentModal = () => {
        setShowEmailSent(false);
    }

    return (
        <>  
            {showEmailSent ? <ShowEmailSentModal parentCallback={hideEmailSentModal} show={showEmailSent}  error={emailError}/> : null}
            {showResetModal ? <CollectEmailForPasswordResetModal parentCallback={hideResetPasswordModal} show={showResetModal} /> : null}
            
            {!user ? (
                <section className="vh-100 loginForm">
                    <div className="container py-5">
                        <div className="row d-flex justify-content-center align-items-center">
                            <div className="col-4">
                                <div className="card shadow-2-strong" style={{ borderRadius: "1rem" }}>
                                    <div className="card-header card text-center bg-success text-white">
                                        <h3 className="mb-0">Login</h3>
                                    </div>
                                    <div className="card-body p-4 text-center">
                                        {error && (
                                            <div className="alert alert-danger" role="alert">
                                                {error}
                                            </div>
                                        )}

                                        <div className="row">
                                            <div className="form-outline mb-4 col-12">
                                                <input
                                                    type="text"
                                                    placeholder="Username"
                                                    id="typeEmailX-2"
                                                    className="form-control form-control-lg"
                                                    onChange={(e) => setUsername(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="form-outline mb-4 col-12">
                                                <input
                                                    type="password"
                                                    placeholder="Password"
                                                    id="typePasswordX-2"
                                                    className="form-control form-control-lg"
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-outline mb-4 col-12">
                                                <button id="protect_btn" className="btn btn-success btn-lg" onClick={handleLogin}>
                                                    Login
                                                </button>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-outline mb-4 col-12">
                                                 {showSendingEmail ? (<LoadingIcons.BallTriangle height="2em"stroke="#198754" show={showSendingEmail} />) : 
                                                (<button id="protect_btn" className="btn btn-success btn-sm" onClick={showResetPasswordModal}>
                                                    Reset Password
                                                </button> )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <selection>
                    <div className="container py-5">
                        <div className="row d-flex justify-content-center align-items-center">
                            <div className="col-4">
                                <div className="card shadow-2-strong" style={{ borderRadius: "1rem"}}>
                                    <div className="card-header card text-center bg-success text-white">
                                        <h3 className="mb-0">Logout</h3>
                                    </div>
                                    <div className="card-body p-4 text-center">
                                        <div className="row">
                                            <div className="form-outline mb-4 col-12">
                                                <button id="protect_btn" className="btn btn-success btn-lg" onClick={handleLogout}>
                                                    Logout
                                                </button>

                                                <Modal show={showModal}>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Login</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>Welcome back, {user.firstName}!</Modal.Body>
                                                    <Modal.Footer>
                                                        <Button onClick={handleClose}>Close</Button>
                                                    </Modal.Footer>
                                                </Modal>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </selection>
            )}
        </>
    );
};

export default Login;