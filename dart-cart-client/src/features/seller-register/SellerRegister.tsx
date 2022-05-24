import { Alert, Modal, Button, Form, Container } from "react-bootstrap";
import { saveSellerandShop, shopRedirect } from "../../common/slices/sellerRegisterSlice";
import { Seller, Shop } from "../../common/types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../common/hooks";
import { fetchSeller, selectUser } from "../../common/slices/authSlice";
import { useSelector } from "react-redux";
import '../../stylesheets/SellerRegister.css';

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
        } else if (homepage.trim() === "") {
            setError("You must create a URL for your shop.");
        } else if (description.trim() === "") {
            setError("Please enter a description for your shop.");
        } else if (location.trim() === "") {
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

        dispatch(saveSellerandShop(shop))
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
        setName("");
        setHomepage("");
        setDescription("");
        setLocation("");
        setError("");
    }

    //redirects to product registration form
    const handleClose = async () => {
        setShowModal(false);
        await dispatch(fetchSeller(currentUser.id));
        dispatch(shopRedirect(null));
        nav("/product-register");
    };

    //closes modal but allows user to create another shop
    function handleAddAnother(){
        setShowModal(false);
    }

    return (
        <>
        <Form>
            <div className="shop-form-heading">
                 <h2>Create Your Shop</h2>
            </div>
            <Container>
                <p>
                    When you become a seller on DartCart, you'll receive a unique web address
                    and your first Shop. You can create more later.
                    <br />
                    Provide a description of your Shop and the address from which you'll be
                    shipping customers' orders.
                </p>
                {error && <Alert variant="danger">{error}</Alert>}

                {/* Shop Name */}
                <Form.Group className="mb-3 form-group">
                    <Form.Label as="h4">
                        Business Name
                    </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder={`Ex. ${currentUser.firstName}'s Shop`}
                        id="busname"
                        size="lg"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }} />
                </Form.Group>

                {/* Homepage */}
                <Form.Group className="mb-3 form-group">
                    <Form.Label as="h4">
                        Business Homepage
                    </Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder={`Ex. shopname`}
                        id="bushomepage"
                        size="lg"
                        value={homepage}
                        onChange={(e) => {
                            setHomepage(e.target.value);
                        }}
                    />
                    <Form.Text>
                        This will be used as the URL for your website. Please use only lowercase letters with no spaces.
                    </Form.Text>
                </Form.Group>

                {/* Description */}
                <Form.Group className="mb-3 form-group">
                    <Form.Label as="h4">
                        Business Description
                    </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ex. The best wholesaler around"
                        id="busdescription"
                        size="lg"
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }} />
                </Form.Group>

                {/* Location */}
                <Form.Group className="form-group">
                    <Form.Label as="h4">
                        Business Address
                    </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ex. 1 Business Ave, City, CA 90210"
                        id="busaddress"
                        size="lg"
                        value={location}
                        onChange={(e) => {
                            setLocation(e.target.value);
                        }} />
                </Form.Group>

                {/* Submit Button */}
                <button 
                    type="button"
                    className="submit-button"
                    onClick={createSeller}
                >
                    Submit
                </button>
            </Container>
        </Form>

        {/* Success Modal */}
        <Modal 
            show={showModal}
            onHide={handleClose}
        >
            <Modal.Header closeButton>
                <Modal.Title>Seller Registration</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Congratulations! Your Shop has been created.
                <br />
                You can now sell on DartCart.
            </Modal.Body>
            <Modal.Footer>
                <button className="modal-button" onClick={handleAddAnother}>Create Another</button>
                <button className="modal-button" onClick={handleClose}>Add Product</button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default SellerRegister;
