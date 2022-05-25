import { Modal, Form, Alert } from "react-bootstrap";
import { useEffect, useState } from "react";
import { homeRedirect, loginUser, selectStatus, selectUser, fetchSeller } from "../../common/slices/authSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../common/hooks";
import axios from "axios";
import LoadingIcons from 'react-loading-icons';

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
            <Modal.Header closeButton style={{ backgroundColor:"var(--orange)", color:"#fff"}}>
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
                <button className="button blue-button" onClick={emailResetPasswordLink}>Reset Password</button>
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

    const handleLogin = async () => {
        await dispatch(loginUser({ username, password }));
        setError("");
        setShowModal(true);
        console.log(username);
        console.log(password);
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

            <Form>
                {/* Heading */}
                <div className="shop-form-heading">
                    <h2>Login</h2>
                </div>
                {error && <Alert variant="danger">{error}</Alert>}

                {/* Username */}
                <Form.Group className="mb-3 form-group">
                    <Form.Label as="h4">
                        Username
                    </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        id="username"
                        size="lg"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }} />
                </Form.Group>
                {/* Password */}
                <Form.Group className="mb-3 form-group">
                    <Form.Label as="h4">
                        Password
                    </Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        id="password"
                        size="lg"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }} />
                </Form.Group>

                {/* Submit Button */}
                <button
                    type="button"
                    className="submit-button"
                    onClick={handleLogin}
                >
                    Login
                </button>

                <div className="row">
                    <div className="form-outline mb-4 col-12">
                            {showSendingEmail ? (<LoadingIcons.BallTriangle height="2em"stroke="#198754" show={showSendingEmail} />) : 
                        (<button type="button" className="review-link" onClick={showResetPasswordModal}>
                            Reset Password
                        </button> )}
                    </div>
                </div>
            </Form>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>Welcome back, {user?.firstName}!</Modal.Body>
                <Modal.Footer>
                    <button className="button orange-button" onClick={handleClose}>Close</button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Login;