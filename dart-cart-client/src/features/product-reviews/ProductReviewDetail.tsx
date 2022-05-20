import { useState } from "react";
import { Alert, Modal, Button, Form } from "react-bootstrap";
import axios from 'axios'
import authHeader from "../authentication/AuthHeader";

function ProductReviewDetail(props) {
    const [showModal, setShowModal] = useState(false);
    const [submitData, setSubmitData] = useState({rating: 5, title:"Fake title"})
    const API_URL = process.env.REACT_APP_API_URL;

    const handleClose = () => {
        setShowModal(false);
        props.callback();
    };
    const handleOpen = () => {
        setShowModal(true);
    };

    const handleChange = (e) => {
        const layoutString = e.target.value;
        setSubmitData({...submitData, [e.target.name]: e.target.value})
    }

    const submitForm = () => {
        console.log('submitForm: ', `${API_URL}create-product-review/product/${props.product_id}`, submitData)
        axios.post(`${API_URL}create-product-review/product/${props.product_id}`, submitData, {
            headers: authHeader()
        })
            .then(res => {
                console.log('axios: ', res.data)
                
            })
            .catch(e => console.log(e))
    }

    return (
        <div>
            <Button onClick={handleOpen}>Leave a Product Review</Button>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Leave a Product Review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Please tell us how you feel about this product.
                    <br />
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" name="title" onChange={handleChange} placeholder="Enter Title" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Comment Here</Form.Label>
                            <Form.Control as="textarea" maxLength={500} name="comment" onChange={handleChange}  rows={11} style={{ height: '200px' }} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Rating</Form.Label>
                            <Form.Control type="text" name="rating" onChange={handleChange} placeholder="Enter Number 1-5" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => {
                        submitForm(); 
                        handleClose()}}>Submit</Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default ProductReviewDetail