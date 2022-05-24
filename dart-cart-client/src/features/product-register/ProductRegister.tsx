import { Alert, Modal, Button, Form, Row, Col, Container } from "react-bootstrap";
import { saveProduct } from "../../common/slices/productRegisterSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../common/hooks";
import { storage } from "../userprofile/firebase";
import { getDownloadURL, uploadBytesResumable, ref } from "firebase/storage";

export function ProductRegister() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [progress, setProgress] = useState(0);

  const dispatch = useAppDispatch();
  const nav = useNavigate();

  const handleFireBaseUpload = (e) => {
    e.preventDefault();
    if(e.target[0].files.length > 0){
      const image = e.target[0].files[0];
      uploadImage(image);
      updatePfp();
    }
  };

  const uploadImage = (image) => {
    if (!image) {
      alert(`image format ${typeof image} not supported`);
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
          product.imageURL = url;
        });
      }
    );
  };

  const updatePfp = async () => {
    setImageURL(imageURL); //asigns new img url
    product.imageURL = imageURL;
  };

  const product = {
    id: 0,
    name: "",
    description: "",
    imageURL: ""
  };

  // BASIC input validation: no empty fields
  const validateInput = () => {
    if (name === "") {
      setError("Please enter a name.");
    } else if (description === "") {
      setError("Please enter a description.");
    } else {
      return true;
    }
  };

  const createProduct = async () => {
    product.name = name;
    product.description = description;
    product.imageURL = imageURL;

    if (!validateInput()) {
      return;
    }

    await dispatch(saveProduct(product))
      .unwrap()
      .then((originalPromiseResult) => {
        setShowModal(true); //need to make sure this says product created, not user registered
        clearInputs();
      })
      .catch((rejectedValueOrSerializedError) => {
        setError("That product name is unavailable.");
        clearInputs();
      });
  };

  function clearInputs() {
    setName("");
    setDescription("");
    setImageURL("");
    document.querySelector("form")?.reset();
    setProgress(0);
  }

  // closes modal but allows user to register another product
  function handleAddAnother() {
    setShowModal(false);
  }

  // Redirects to inventory form
  function handleClose() {
    setShowModal(false);
    nav('/shop-product-add');
  }

  return (
    <>
      <Container className="shop-form">
        {/* Heading */}
        <div className="shop-form-heading">
          <h2>Create a Product</h2>
        </div>
        {error && <Alert variant="danger">{error}</Alert>}

        {/* Image upload */}
        {imageURL && <img src={imageURL} height={150} alt="Product" />}
        <Form id="imageform" onSubmit={handleFireBaseUpload}>
          <Form.Group className="mb-3 form-group">
            <Form.Label as="h4">
              Choose an image
            </Form.Label>
            <Row id="file-upload-container">
              <Col sm="8">
                <Form.Control 
                  type="file"
                />
              </Col>
              <Col sm="auto">
                <button
                  type="submit"
                  className="upload-button"
                >
                  Upload
                </button>
                <span>{progress}%</span>
              </Col>
            </Row>
          </Form.Group>
        </Form>

        {/* Name */}
        <Form.Group className="mb-3 form-group">
          <Form.Label as="h4">
            Product Name
          </Form.Label>
          <Form.Control
            type="text"
            placeholder={`Product Name`}
            id="productname"
            size="lg"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }} />
        </Form.Group>

        {/* Description */}
        <Form.Group className="mb-3 form-group">
          <Form.Label as="h4">
            Product Description
          </Form.Label>
          <Form.Control
            as="textarea"
            type="text"
            placeholder="Product Description"
            id="productdescription"
            size="lg"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }} />
        </Form.Group>

        {/* Submit button */}
        <button
          type="button"
          className="submit-button"
          onClick={createProduct}
        >
          Submit
        </button>
      </Container>

      {/* Success Modal */}
      <Modal 
        show={showModal}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Product Registration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Congratulations! Your product was successfully created!
        </Modal.Body>
        <Modal.Footer>
          <button className="modal-button" onClick={handleAddAnother}>Add Another</button>
          <button className="modal-button" onClick={handleClose}>Add Inventory</button>
        </Modal.Footer>
      </Modal>

    </>
  );
}

export default ProductRegister;
