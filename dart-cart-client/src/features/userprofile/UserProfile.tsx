import { Alert, Modal, Button } from "react-bootstrap";
import { updateUser, homeRedirect } from "../../common/slices/userProfileSlice";
import { User } from "../../common/types";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../common/hooks";
import { loginUser } from "../../common/slices/authSlice";
import authHeader from "../../features/authentication/AuthHeader";
import axios from "axios";

export function UserP() {
    const currentDate = Date.now();
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [location, setLocation] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [initialUser, setInitialUser] = useState({});
    const [imageURL, setImageURL] = useState("");
    const [aboutMe, setAboutMe] = useState("");

    async function fetchUser() {
        const response = await axios.get("http://localhost:9005/getProfile", { headers: authHeader() });
        const fetchedUser = await response.data;
        console.log(fetchedUser);
        setInitialUser(fetchedUser);
        setFirstName(fetchedUser.firstName);
        setLastName(fetchedUser.lastName);
        setEmail(fetchedUser.email);
        setPhone(fetchedUser.phone);
        setLocation(fetchedUser.location);
        setImageURL(fetchedUser.imageURL);
        setAboutMe(fetchedUser.aboutMe);


    }


    useEffect(() => {
        fetchUser();
    }, []);



    const dispatch = useAppDispatch();
    const nav = useNavigate();

    const user: User = {
        id: 0,
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        location: "",
        registrationDate: 0,
        aboutMe: "",
        imageURL: ""
    };

    // BASIC input validation: no empty fields, passwords must match, formatting requirements
    // Possible TODO: Password complexity requirements
    // Possible TODO: Enforcing username requirements, address formatting
      const validateInput = () => {
        if (email === "") {
          setError("Please enter an email address.");
        } else if (!email.includes("@") || !email.includes(".")) {
          setError("Invalid email address.");
        } else if (firstName === "") {
          setError("Please enter your first name.");
        } else if (lastName === "") {
          setError("Please enter your last name.");
        } else if (location === "") {
          setError("Please enter your home address.");
        } else if (phone === "") {
          setError("Please enter your phone number.");
        } else if (
          !phone.match(/^\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/)
        ) {
          setError("Invalid phone number.");
        } else {
          return true;
        }
      };

    const updateUserProfile = async () => {
        user.aboutMe = aboutMe;
        user.imageURL = imageURL;
        user.firstName = firstName;
        user.lastName = lastName;
        user.location = location;
        user.email = email;
        user.phone = phone;



        if (!validateInput()) {
          return;
        }

        await dispatch(updateUser(user))
            .unwrap()
            .then((originalPromiseResult) => {
                setShowModal(true);
            })
            .catch((rejectedValueOrSerializedError) => {
                setError("That username is unavailable.");
                clearInputs();
            });
    };

    function clearInputs() {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setLocation("");
        setImageURL("");
        setAboutMe("");
    }

    // Redirect upon modal close
    function handleClose() {
        setShowModal(false);
        dispatch(homeRedirect(null));
        // nav("/");
    }

    return (
        <>
            <section className="vh-200">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-lg-10 col-sm-12">
                            <div
                                className="card shadow-2-strong"
                                style={{ borderRadius: "1rem" }}
                            >
                                <div className="card-header card text-center bg-success text-white">
                                    <h3 className="mb-0">Update your profile</h3>
                                    <img></img>
                                </div>
                                <div
                                    className="card-body p-5 text-center"
                                >
                                    {error ? <Alert variant="danger">{error}</Alert> : null}

                                    <div className="row align-items-center">
                                        <div className="form-outline mb-4">
                                            <input
                                                type="text"
                                                placeholder="AboutMe"
                                                id="typePasswordX-2"
                                                className="form-control form-control-lg"
                                                value={aboutMe}
                                                onChange={(e) => {
                                                    setAboutMe(e.target.value);
                                                }}
                                            />
                                        </div>
                                    </div>


                                    {/* <div className="row align-items-center">
                                        <div className="form-outline mb-4">
                                            <input
                                                type="text"
                                                placeholder="Profile Image"
                                                id="typePasswordX-2"
                                                className="form-control form-control-lg"
                                                value={imageURL}
                                                onChange={(e) => {
                                                    setImageURL(e.target.value);
                                                }}
                                            />
                                        </div>
                                    </div> */}


                                    <div className="row align-items-center">
                                        <div className="form-outline mb-4">
                                            <input
                                                type="email"
                                                placeholder="Email Address"
                                                id="typePasswordX-2"
                                                className="form-control form-control-lg"
                                                value={email}
                                                onChange={(e) => {
                                                    setEmail(e.target.value);
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="form-outline mb-4 col-6">
                                            <input
                                                type="text"
                                                placeholder="First Name"
                                                id="typePasswordX-2"
                                                className="form-control form-control-lg"
                                                value={firstName}
                                                onChange={(e) => {
                                                    setFirstName(e.target.value);
                                                }}
                                            />
                                        </div>
                                        <div className="form-outline mb-4 col-6">
                                            <input
                                                type="text"
                                                placeholder="Last Name"
                                                id="typePasswordX-2"
                                                className="form-control form-control-lg"
                                                value={lastName}
                                                onChange={(e) => {
                                                    setLastName(e.target.value);
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="form-outline mb-4">
                                            <input
                                                type="text"
                                                placeholder="Home Address"
                                                id="typePasswordX-2"
                                                className="form-control form-control-lg"
                                                value={location}
                                                onChange={(e) => {
                                                    setLocation(e.target.value);
                                                }}
                                            />
                                        </div>
                                        <div className="form-outline mb-4">
                                            <input
                                                type="phone"
                                                placeholder="Phone Number"
                                                id="typePasswordX-2"
                                                className="form-control form-control-lg"
                                                value={phone}
                                                onChange={(e) => {
                                                    setPhone(e.target.value);
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <button
                                        className="btn btn-success btn-lg btn-block"
                                        onClick={updateUserProfile}
                                    >
                                        Update Profile
                                    </button>

                                    <Modal show={showModal}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Update Profile</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            Your profile was updated!
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button onClick={handleClose}>Close</Button>
                                        </Modal.Footer>
                                    </Modal>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default UserP;