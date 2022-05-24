import React, {useEffect, useState} from 'react';
import {Modal, Form, FormControl} from "react-bootstrap";
import "./finaModalStyling.css";
import FinalTechChat from '../../../FinalTechChat';
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../../../common/types";
import { useDispatch, useSelector } from "react-redux";


const TempTwoModel = () => {

    const [modal, setModal] = useState(false);
    const [messageList, setMessageList] = useState([{}]);
    //const [modal, setModal] = useState(true);
    const [show,setShow] = useState("");
    const [chatInput, setChatInput] = useState([]);
    // const [userInfo,setUserInfo] = useState(JSON.parse(localStorage.getItem("user")));



    const [name, setName] = useState("");
    const user =
        useSelector((state) => state.authentication.user) || "";

    useEffect(() => {
        if (user) {
            const u = JSON.parse(user);
            setName(u.firstName);
        }
    }, [user]);

    const showModal = () => {
            setModal(true);
            console.log(modal)
        console.log("hitting showModal")
        // console.log("USER:" + userInfo);
    }

    const closeModal = () => {
        setModal(false);
        setMessageList([{}]);
        console.log("hitting closingModal")
    }

    //Modify Message list using new message from tech chat socket
    const callback = (newMessagesArray) => {
        setMessageList((messageList) => messageList.concat(newMessagesArray));
    }

    const chatInputHandler = (e) => {
        setChatInput(e.target.value);
    }


    return (
        <>
            <section className="fade-in-effect">

                <section className="admin-techchat-modal-section">
                    <button className="clickMe bubbly-button" onClick={showModal}>
                        User Chat
                    </button>
                </section>

                <h1 className="test">Text</h1>

                <section
                    className={`modalContainer ${show ? "show" : ""} `}
                >

                    <Modal
                            className="modalContainer"
                            show={modal}
                            onHide={closeModal}
                            centered
                        >
                            <div className="admin-tech-modal">
                            <Modal.Header className="modal_header">

                            <h2 className="modal_header-title ">User : {name.username} | Techie : name  </h2>
                                <button
                                    className="admin-techchat-close-button"
                                    onClick={closeModal}
                                >
                                    x
                                </button>
                                

                            </Modal.Header>
                            <Modal.Body className="modal_content">
                                {messageList.map((message) => (
                                    <p>{message.content}</p>
                                ))}
                                
                                Enter the chat response
                                {/*{reply}*/}
                            </Modal.Body>
                            <Modal.Footer className="modal_footer">
                                <FormControl
                                    type="text"
                                    name="responseMessage"
                                    value={chatInput.responseMessage}
                                    placeholder="Enter message here"
                                    onChange={chatInputHandler}
                                />
                                {/*submit the respone an add it the existing one*/}
                                {/* <button className="admin-techchat-modal-button submit"> */}
                                    <FinalTechChat messages={messageList} callbackFunction={callback} input={chatInput}/>
                                {/*<FinalTechChat messages={messageList} callbackFunction={callback} input={chatInput} userInfo={userInfo}/>*/}
                                {/* </button> */}
                            </Modal.Footer>
                            </div>
                        </Modal>
                </section>

            </section>

        </>
    );
};

export default TempTwoModel;