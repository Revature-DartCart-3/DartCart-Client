import { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import axios from 'axios'
import authHeader from "../authentication/AuthHeader";

function ProductReviewDetail({product_id, callback, showModal, setShowModal}) {
    const [submitData, setSubmitData] = useState({rating: 0, title:""})
    const API_URL = process.env.REACT_APP_API_URL;

    const handleChange = (e) => {
        setSubmitData({...submitData, [e.target.name]: e.target.value})
    }

    const submitForm = () => {
        console.log('submitForm: ', `${API_URL}create-product-review/product/${product_id}`, submitData)
        axios.post(`${API_URL}create-product-review/product/${product_id}`, submitData, {
            headers: authHeader()
        })
            .then(res => {
                callback();
            })
            .catch(e => {
                alert("Cannot submit duplicate review")
            })
    }

    return (
        <div>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Leave a Product Review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Please tell us how you feel about this product.
                    <br />
                    <Form className="modal-form">
                        <Form.Group className="mb-3" >
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" name="title" onChange={handleChange} placeholder="Enter Title" />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Comment Here</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                maxLength={500} 
                                name="comment" 
                                onChange={handleChange}  
                                rows={11} 
                                style={{ height: '200px' }} />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Rating</Form.Label>
                            <Form.Control type="number" 
                                name="rating" 
                                min="0"
                                max="5"
                                onChange={handleChange} 
                            />
                            <Form.Text>Enter a number 1-5</Form.Text>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <button className="submit-button" onClick={() => {
                        submitForm(); 
                        setShowModal(false)}}>Submit</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ProductReviewDetail