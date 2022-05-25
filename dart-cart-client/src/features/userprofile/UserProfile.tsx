import { Alert, Col, Container, Form, Row } from "react-bootstrap";
import { updateUser } from "../../common/slices/userProfileSlice";
import { User } from "../../common/types";
import { useState, useEffect } from "react";
import { useAppDispatch } from "../../common/hooks";
import authHeader from "../../features/authentication/AuthHeader";
import axios from "axios";
import { storage } from "./firebase";
import { getDownloadURL, uploadBytesResumable, ref } from "firebase/storage";

export function UserProfile() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [_initialUser, setInitialUser] = useState({});
  const [imageURL, setImageURL] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const API_URL = process.env.REACT_APP_API_URL;

  async function fetchUser() {
    const response = await axios.get(API_URL + "getProfile", {
      headers: authHeader(),
    });
    const fetchedUser = await response.data;
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

  //firebase
  const [progress, setProgress] = useState(0);

  //stores file upload to firebase and updates profile url
  const handleFireBaseUpload = (e) => {
    if(e.target[0].files?.length > 0) {
      const image = e.target[0].files[0];
      uploadImage(image);
    }
  };

  const uploadImage = (image) => {
    if (!image) {
      alert(`image format not supported${typeof image}`);
      return;
    }
    const storageRef = ref(storage, `/images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (err) => console.log(err),
      () => {
        //fetching download Url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImageURL(url); //changes from setUrl
          console.log(url);
        });
      }
    );
  };

  const dispatch = useAppDispatch();

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
    imageURL: "",
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

  //gathers information from form and sends updated info to database
  const updateUserProfile = async (e) => {
    e.preventDefault();

    handleFireBaseUpload(e);

    user.aboutMe = aboutMe;
    user.imageURL = imageURL;
    user.firstName = firstName;
    user.lastName = lastName;
    user.location = location;
    user.email = email;
    user.phone = phone;
    user.imageURL = imageURL;

    if (!validateInput()) {
      return;
    }

    await dispatch(updateUser(user))
      .unwrap()
      .catch((_rejectedValueOrSerializedError) => {
        setError("That username is unavailable.");
        clearInputs();
      });
  };


  const setProfileImage = async () => {
    setImageURL(imageURL); //asigns new ims url
    user.imageURL = imageURL;
  };

  function clearInputs() {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setLocation("");
    setImageURL("");
    setAboutMe("");
    setProgress(0);
  }

  return (<>
    <Form onSubmit={updateUserProfile}>

      {/* Heading */}
      <div className="shop-form-heading">
        <h2>Update Your Profile</h2>
      </div>

      <Container>
        {error ? <Alert variant="danger">{error}</Alert> : null}

        {/* Profile Picture */}
        <Form.Group className="mb-4">
          <Form.Label as="h6">
            Profile Picture
          </Form.Label>
          {imageURL&&<img src={imageURL} className="form-img" alt="Profile Picture" />}
          <Row id="file-upload-container">
            <Col sm="8">
              <Form.Control
                type="file"
              />
            </Col>
            <Col sm="auto">
              <button
                type="button"
                className="upload-button"
                onClick={setProfileImage}
              >
                Upload
              </button>
              <span>{progress}%</span>
            </Col>
          </Row>
        </Form.Group>

        {/* Name */}
        <Row className="mb-4">
          <Form.Group as={Col}>
            <Form.Label as="h6">
              First Name
            </Form.Label>
            <Form.Control 
              type="text"
              placeholder="First Name"
              size="lg"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label as="h6">
              Last Name
            </Form.Label>
            <Form.Control 
              type="text"
              placeholder="Last Name"
              size="lg"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
          </Form.Group>
        </Row>

        {/* Email */}
        <Form.Group className="mb-4">
          <Form.Label as="h6">
            Email
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Email Address"
            size="lg"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Group>

        {/* Address */}
        <Form.Group className="mb-4">
          <Form.Label as="h6">
            Address
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Home Address"
            size="lg"
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
        </Form.Group>

        {/* Phone */}
        <Form.Group className="mb-4">
          <Form.Label as="h6">
            Phone Number
          </Form.Label>
          <Form.Control
            type="phone"
            placeholder="Phone Number"
            size="lg"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
        </Form.Group>

        {/* About Me */}
        <Form.Group>
          <Form.Label as="h6">
            About Me
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="About Me"
            size="lg"
            value={aboutMe}
            onChange={e => setAboutMe(e.target.value)}
          />
        </Form.Group>

        {/* Submit Button */}
        <button
          type="submit"
          className="mb-4 submit-button"
        >
          Update
        </button>
      </Container>
    </Form>
  </>);
}

export default UserProfile;
