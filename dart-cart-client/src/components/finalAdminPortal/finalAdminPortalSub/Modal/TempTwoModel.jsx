import React, {useState} from 'react';
import {Modal} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./finaModalStyling.css";
import FinalTechChat from '../../../FinalTechChat';




const TempTwoModel = () => {

    const [modal, setModal] = useState(false);
    const [messageList, setMessageList] = useState([{}]);
    const showModal = () => {
            setModal(true);
            console.log(modal)
        console.log("hitting showModal")
    }

    const closeModal = () => {
        setModal(false);
        console.log("hitting closingModal")
    }

    const callback = (newMessagesArray) => {
        setMessageList((messageList) => messageList.concat(newMessagesArray));
    }

    // const RenderMessages = () => {
    //     return(
    //     messages.map((message) => {
    //         <p>{message}</p>
    //     })
    //     )
    // };

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
                    <main className="modal_content">
                        {messageList.map((message) => (
                                <p>{message.content}</p>
                            ))}
                        <FinalTechChat messages={messageList} callbackFunction={callback}/>

                    </main>
                    <footer className="modal_footer">
                    </footer>
                </Modal>
            </section>
        </>
    );
};

export default TempTwoModel;