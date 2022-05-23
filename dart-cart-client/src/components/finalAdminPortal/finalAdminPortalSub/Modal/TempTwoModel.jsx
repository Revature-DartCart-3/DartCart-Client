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
                    ****************
                </button>
            </section>


            <section>
                <Modal
                    show={modal}
                    onHide={closeModal}
                    centered
                >
                    <Modal.Header>
                        <h2 className="modal_header-title ">title</h2>

                    </Modal.Header>
                    <Modal.Body>
                        children
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="submit ">Submit</button>
                    </Modal.Footer>
                </Modal>
            </section>
        </>
    );
};

export default TempTwoModel;