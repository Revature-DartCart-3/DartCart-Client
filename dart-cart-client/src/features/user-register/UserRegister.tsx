import { Alert, Modal, Form, Row, Col } from "react-bootstrap";
import { saveUser } from "../../common/slices/userRegisterSlice";
import { User } from "../../common/types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../common/hooks";
import { loginUser } from "../../common/slices/authSlice";

import "./protect_btn.css";

export function UserRegister() {
  const currentDate = Date.now();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

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
    aboutMe : "",
    imageURL: ""
  };

  // BASIC input validation: no empty fields, passwords must match, formatting requirements
  // Possible TODO: Password complexity requirements
  // Possible TODO: Enforcing username requirements, address formatting
  const validateInput = () => {
    if (username === "") {
      setError("Please enter a username.");
    } else if (email === "") {
      setError("Please enter an email address.");
    } else if (!email.includes("@") || !email.includes(".")) {
      setError("Invalid email address.");
    } else if (password === "") {
      setError("Please enter a password.");
    } else if (password !== rePassword) {
      setError("Passwords do not match. Please confirm your password.");
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

  const createUser = async () => {
    user.username = username;
    user.email = email;
    user.password = password;
    user.firstName = firstName;
    user.lastName = lastName;
    user.location = location;
    user.phone = phone;
    user.registrationDate = currentDate;

    if (!validateInput()) {
      return;
    }

    await dispatch(saveUser(user))
      .unwrap()
      .then((_res) => {
        setShowModal(true);
        dispatch(
          loginUser({ username: user.username, password: user.password })
        );
      })
      .catch((err) => {
        if(err.response.status === 500){
          setError("Unable to register. Please check your connection and try again.");
        } else {
          setError("That username is unavailable.");
          clearInputs();
        }
      });
  };

  function clearInputs() {
    setUsername("");
  }

  // Redirect upon modal close
  function handleClose() {
    setShowModal(false);
    nav("/");
  }

  return (
    <>
      <Form>
        {/* Heading */}
        <div className="shop-form-heading">
          <h2>Create Your Account</h2>
        </div>
        {error && <Alert variant="danger">{error}</Alert>}

        {/* Name */}
        <Form.Group className="mb-3 form-group">
          <Form.Label as="h4">
            Name
          </Form.Label>
          <Row>
            <Col sm="6">
              <Form.Control
                type="text"
                placeholder="Enter first name"
                id="first"
                size="lg"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }} />
            </Col>
            <Col sm="6">
              <Form.Control
                type="text"
                placeholder="Enter last name"
                id="last"
                size="lg"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }} />
            </Col>
          </Row>     
        </Form.Group>

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
          <Row>
            <Col sm="6">
              <Form.Control
                type="password"
                placeholder="Enter password"
                id="password"
                size="lg"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }} />
            </Col>
            {/* Re-type password check */}
            <Col sm="6">
              <Form.Control
                type="password"
                placeholder="Re-enter password"
                id="repassword"
                size="lg"
                value={rePassword}
                onChange={(e) => {
                  setRePassword(e.target.value);
                }} />
            </Col>
          </Row>
        </Form.Group>

        {/* Email */}
        <Form.Group className="mb-3 form-group">
          <Form.Label as="h4">
            Email
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            id="email"
            size="lg"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }} />
        </Form.Group>

        {/* Address */}
        <Form.Group className="mb-3 form-group">
          <Form.Label as="h4">
            Address
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter home address"
            id="address"
            size="lg"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }} />
        </Form.Group>

        {/* Phone */}
        <Form.Group className="mb-3 form-group">
          <Form.Label as="h4">
            Phone Number
          </Form.Label>
          <Form.Control
            type="phone"
            placeholder="Enter phone number"
            id="phone"
            size="lg"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }} />
        </Form.Group>

        {/* Submit Button */}
        <button
          type="button"
          className="submit-button"
          onClick={createUser}
        >
          Register
        </button>
      </Form>

      {/* Success Modal */}
      <Modal 
        show={showModal}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Registration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Account succcessfully created. Welcome to DartCart!
        </Modal.Body>
        <Modal.Footer>
          <button className="modal-button" onClick={handleClose}>Get Started</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UserRegister;
