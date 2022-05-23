import React, {useState} from 'react';
import {Form, Modal} from "react-bootstrap";
import '../adminTechStylesheet.css';
import axios from "axios";
import {useStepContext} from "@mui/material";

const FinalTwoWayChatModal = () => {

    const [showModal, setShowModal] = useState(false);
    const [reply, setReply] = useState([])

    const handleClose = () => {
        setShowModal(false);
        console.log(showModal);
    }

    const handleShow = () => {
        setShowModal(true);
        console.log(showModal);
    }

    function responseToReply() {
        axios.put("http://localhost:9005/private-message")
            .then((response) => {
                setReply(reply);
            })
    }

    return (
        <>
            <section>
                <button className="clickMe bubbly-button" onClick={handleShow}>
                    Chat With Clients
                </button>

                <Modal
                    className="modal"
                    show={showModal}
                    onHide={handleClose}
                    centered
                >

                    <Modal.Header>
                        <h2 className="chatUsername">User Name</h2>
                    </Modal.Header>

                    <Modal.Body>


                        {reply}

                    </Modal.Body>

                    <Modal.Footer>
                        <div className="admin-tech-panel-button">
                            <button
                                type="submit"
                                onClick=""
                            >
                                <p>Reply</p>
                            </button>
                        </div>

                    </Modal.Footer>
                </Modal>
            </section>




        </>
    );
};

export default FinalTwoWayChatModal;