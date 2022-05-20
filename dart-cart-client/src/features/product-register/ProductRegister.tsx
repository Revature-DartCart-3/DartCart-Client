import { Alert, Modal, Button } from "react-bootstrap";
import { saveProduct } from "../../common/slices/productRegisterSlice";
import { Product } from "../../common/types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../common/hooks";
import { storage } from "../userprofile/firebase";
import { getDownloadURL, uploadBytesResumable, ref } from "firebase/storage";

export function ProductRegister() {
  const currentDate = Date.now();
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
    const image = e.target[0].files[0];
    console.log("uploading pic");
    console.log(image);
    uploadImage(image);
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
          product.imageURL = url;
          console.log(url);
        });
      }
    );
  };

  const updatePfp = async () => {
    setImageURL(imageURL); //asigns new img url
    product.imageURL = imageURL;
  };

  const product: Product = {
    id: 0,
    name: "",
    description: "",
    imageURL: ""
  };

  // BASIC input validation: no empty fields, passwords must match, formatting requirements
  // Possible TODO: Password complexity requirements
  // Possible TODO: Enforcing username requirements, address formatting
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
  }

  // Redirect upon modal close
  function handleClose() {
    setShowModal(false);
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
                  <h3 className="mb-0">Create A Product</h3>
                </div>
                <div
                  className="card-body p-5 text-center"
                >
                  {error ? <Alert variant="danger">{error}</Alert> : null}

                  <div className="row">
                    <img src={imageURL} height={150} alt="Product Image" />
                    <form onSubmit={handleFireBaseUpload}>
                      <input type="file" />
                      <button onClick={updatePfp}>Upload</button>
                      <h4>{progress}%</h4>
                    </form>
                  </div>

                  <div className="row">
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        placeholder="Product Name"
                        id="typePasswordX-2"
                        className="form-control form-control-lg"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </div>
                </div>
                <div className="row">
                    <div className="form-outline">
                      <textarea
                        placeholder="Product Description"
                        id="typePasswordX-2"
                        className="form-control form-control-lg"
                        value={description}
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                        
                      />
                    </div>
                  </div>
                  </div>

                  <button
                    className="btn btn-success btn-lg btn-block"
                    onClick={createProduct}
                  >
                    Create
                  </button>

                  <Modal show={showModal}>
                    <Modal.Header closeButton>
                      <Modal.Title>Product Registration</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      Product created. Congratulations!
                    </Modal.Body>
                    <Modal.Footer>
                      <Button onClick={handleClose}>Close</Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
      </section>
    </>
  );
}

export default ProductRegister;
