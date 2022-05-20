import { Alert, Modal, Button } from "react-bootstrap";
import { saveSellerandShop, shopRedirect } from "../../common/slices/sellerRegisterSlice";
import { Seller, Shop } from "../../common/types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../common/hooks";
import { fetchSeller, selectUser, updateSeller } from "../../common/slices/authSlice";
import { useSelector } from "react-redux";

export function SellerRegister() {
    // Get user from store
    const currentUserString = useSelector(selectUser);
    const currentUser = JSON.parse(currentUserString || "");

    const [name, setName] = useState("");
    const [homepage, setHomepage] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState("");

    const dispatch = useAppDispatch();
    const nav = useNavigate();

    const seller: Seller = {
        id: 0,
        name: "",
        homepage: "",
        description: "",
        user: currentUser
    };

    const shop: Shop = {
        id: 0,
        location: "",
        seller: seller
    };

    function validateInput() {
        if (name === "") {
            setError("Please enter the name of your business.");
        } else if (homepage === "") {
            setError("You must create a URL for your Shop.");
        } else if (description === "") {
            setError("Please enter a description for your Shop.");
        } else if (location === "") {
            setError("Please enter your business address.");
        } else {
            return true;
        }
    }

    const createSeller = async () => {
        seller.name = name;
        seller.homepage = homepage;
        seller.description = description;
        shop.location = location;

        if (!validateInput()) {
            return;
        }

        await dispatch(saveSellerandShop(shop))
            .unwrap()
            .then((originalPromiseResult) => {
                setShowModal(true);
            })
            .catch((rejectedValueOrSerializedError) => {
                setError("That homepage address is unavailable.");
                clearInputs();
            });
    };

    function clearInputs() {
        setHomepage("");
    }

    const handleClose = async () => {
        setShowModal(false);
        await dispatch(fetchSeller(currentUser.id));
        dispatch(shopRedirect(null));
        nav("/");
    };

    return (
        <>
            <section className="vh-200">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-10">
                            <div className="card shadow-2-strong" style={{ borderRadius: "1rem" }}>
                                <div className="card-header card text-center bg-success text-white">
                                    <h3 className="mb-0">Create Your Shop</h3>
                                </div>
                                <div className="card-body p-3 text-center">
                                    <div id="description">
                                        <p>
                                            When you become a seller on DartCart, you'll receive a unique web address
                                            and your first Shop. You can create more later.
                                            <br />
                                            Provide a description of your Shop and the address from which you'll be
                                            shipping customers' orders.
                                        </p>
                                    </div>

                                    {error ? <Alert variant="danger">{error}</Alert> : null}

                                    <div className="row">
                                        <div className="form-outline mb-0">
                                            {/* Note: This is the Seller's name. */}
                                            <h4>Business Name</h4>
                                        </div>
                                        <div className="form-outline mb-4">
                                            <input
                                                type="text"
                                                placeholder={`${currentUser.firstName}'s Shop`}
                                                id="typeEmailX-2"
                                                className="form-control form-control-lg"
                                                value={name}
                                                onChange={(e) => {
                                                    setName(e.target.value);
                                                }}
                                            />
                                        </div>
                                        <div className="form-outline mb-0">
                                            <h4>Business Homepage</h4>
                                            <p>Use lowercase letters with no spaces.</p>
                                        </div>
                                        <div className="form-outline mb-4">
                                            <input
                                                type="text"
                                                placeholder="myshop"
                                                id="typeEmailX-2"
                                                className="form-control form-control-lg"
                                                value={homepage}
                                                onChange={(e) => {
                                                    setHomepage(e.target.value);
                                                }}
                                            />
                                        </div>
                                        <div className="form-outline mb-0">
                                            <h4>Business Description</h4>
                                        </div>
                                        <div className="form-outline mb-4">
                                            <input
                                                type="text"
                                                placeholder="The best wholesaler around"
                                                id="typePasswordX-2"
                                                className="form-control form-control-lg"
                                                value={description}
                                                onChange={(e) => {
                                                    setDescription(e.target.value);
                                                }}
                                            />
                                        </div>
                                        <div className="form-outline mb-0">
                                            <h4>Business Address</h4>
                                        </div>
                                        <div className="form-outline mb-4">
                                            <input
                                                type="text"
                                                placeholder="1 Business Ave, City, CA 90210"
                                                id="typePasswordX-2"
                                                className="form-control form-control-lg"
                                                value={location}
                                                onChange={(e) => {
                                                    setLocation(e.target.value);
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <button className="btn btn-success btn-lg btn-block" onClick={createSeller}>
                                        Sign Up
                                    </button>

                                    <Modal show={showModal}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Seller Registration</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            Congratulations! Your Shop has been created.
                                            <br />
                                            You can now sell on DartCart.
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

export default SellerRegister;
