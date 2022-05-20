import { Modal, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { homeRedirect, loginUser, selectStatus, selectUser, fetchSeller, logout } from "../../common/slices/authSlice";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../common/hooks";
import axios from "axios";
import LoadingIcons from 'react-loading-icons';

import "../../App.css";
import "./protect_btn.css";

// Change URL for testing vs. production
const API_URL = process.env.REACT_APP_API_URL;

export const ResetPassword = () => {

    const[ searchParams, setSearchParams] = useSearchParams(); // holds query params from url
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [doPasswordsMatch, setDoPasswordsMatch] = useState(true); // holds whether passwords currently match

    //hold state for request
    const [reqReturnedError, setReqReturnedError] = useState(""); // has the request returned
    const [showSendingRequest, setShowSendingRequest] = useState(false);

    const [error, setError] = useState("");
    const status = useSelector(selectStatus);
    
    const nav = useNavigate();
    const dispatch = useAppDispatch();

    // get username
    let userName = searchParams.get("data").split(""); // puts 'data's value from query param into username   

    // get imail id for reset password request
    let emailId = searchParams.get("data2");
    
    // get time the email was sent
    let timeSinceEmailWasSent = parseInt(searchParams.get("data3"));
    // get time to expire
    let minutes = parseInt(searchParams.get("data4"));
    // add time to expire to timestamp of email
    let expireTime =  timeSinceEmailWasSent + minutes*60000;
    //if time sent + minutes is less than now, email has expired
    //  note: this time is enforced on the api server, the url param is for pre checking.
    let emailIsValid = expireTime < Date.now()  ? false : true;
    
    useEffect(() => {
        if (status === "failure") setError("Reset Password Failed.");
    }, [status]);

    // reset user password in database 
    const handleResetPassword = () => { 
        if(password1 == "" || password2 == "" || !doPasswordsMatch) {
            return;
        }
        setShowSendingRequest(true);
        axios
        .patch(API_URL + "resetpassword", {
            emailId: emailId,
            password: password1
        })
        .then((response) => {
            setShowSendingRequest(false);
            console.log("RESP:");
            console.log(response);
            nav("/login");
        })
        .catch((error) => {
            setShowSendingRequest(false);
            if(error.response) {
                if( (error.response.status == 404) ) {
                    setReqReturnedError("404. Reset Password Request not found.");                    
                }
            }
            else if (error.request) {
                setReqReturnedError("Unable to reach Server.");
            }
        });        
    }
        
    // handlePassword1Change and handlePassword2Change compare the two passwords
    const handlePassword1Change = (event) => {
        if(password2 != "" && password2 != event.target.value) {
            setDoPasswordsMatch(false);
        }
        else {
            setDoPasswordsMatch(true);
        }
        setPassword1(event.target.value);
    }
    const handlePassword2Change = (event) => {
        if(password1 != event.target.value) {
            setDoPasswordsMatch(false);
        }
        else {
            setDoPasswordsMatch(true);
        }
        setPassword2(event.target.value);
    }

    return (
        <>  
        {reqReturnedError ? 
            (<h1 className="error_rp_email error_rp_email_reset">{reqReturnedError}<br />Reset Password Failed</h1>)  
            : 
            ( <section className="vh-100 loginForm">

                <div className="container py-5" >
                    { !emailIsValid ? 
                    (<h3>The email has expired</h3>)
                    :
                    (
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-14">
                            <div className="card shadow-2-strong" style={{ borderRadius: "1rem" }}>
                                <div className="card-header card text-center bg-success text-white">
                                    <h3 className="mb-0">Reset Password for {userName}</h3>
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
                                                type="password"
                                                placeholder="Enter Password"
                                                className="form-control form-control-lg"
                                                onChange={handlePassword1Change}
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="form-outline mb-4 col-12">
                                            <input
                                                type="password"
                                                placeholder="Repeat Password"
                                                className="form-control form-control-lg"
                                                onChange={handlePassword2Change}
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="form-outline mb-4 col-12">
                                            {showSendingRequest ? 
                                            (<LoadingIcons.BallTriangle height="2em"stroke="#198754" />) 
                                            : 
                                            (<button id="protect_btn" className="btn btn-success btn-lg" onClick={handleResetPassword}>
                                                Reset Password
                                            </button> )}
                                        </div>
                                        {!doPasswordsMatch ? (<h5 className="error_rp_email">Passwords must match!</h5> ) : ( <span></span> )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)}
                </div>
            </section>)
        }
        </>
    );
};

export default ResetPassword;
