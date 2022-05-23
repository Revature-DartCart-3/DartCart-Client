import React, {useState} from 'react';
import {Modal} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./finaModalStyling.css";

const TempTwoModel = () => {

    const [modal, setModal] = useState(true);

    const showModal = () => {
            setModal(true);
            console.log(modal)
        console.log("hitting showModal")
    }

    const closeModal = () => {
        setModal(false);
        console.log("hitting closingModal")
    }



    return (
        <>
            <section>
                <button className="clickMe bubbly-button" onClick={showModal}>
                    User Chat
                </button>
            </section>

            <section>
                <Modal
                    show={modal}
                    onHide={closeModal}
                    centered
                >
                    <Modal.Header>
                        <h2 className="modal_header-title ">User : name | Techie : name  </h2>
                    </Modal.Header>
                    <Modal.Body>
                        Enter the chat response
                        {/*{reply}*/}
                    </Modal.Body>
                    <Modal.Footer>
                        {/*submit the respone an add it the existing one*/}
                        <button className="submit ">Reply</button>
                    </Modal.Footer>
                </Modal>
            </section>
        </>
    );
};

export default TempTwoModel;