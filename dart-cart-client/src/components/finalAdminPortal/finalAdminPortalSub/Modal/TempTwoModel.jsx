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
                    <header className="modal_header">
                        <h2 className="modal_header-title ">title</h2>

                    </header>
                    <main className="modal_content">children</main>
                    <footer className="modal_footer">
                        <button className="submit ">Submit</button>
                    </footer>
                </Modal>
            </section>
        </>
    );
};

export default TempTwoModel;