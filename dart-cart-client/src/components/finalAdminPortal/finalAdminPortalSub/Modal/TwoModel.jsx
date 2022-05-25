import React, {useEffect, useRef, useState} from 'react';
import {Modal, Form, FormControl} from "react-bootstrap";
import "./finaModalStyling.css";
import TechChat from '../../../../features/TechChat/TechChat';
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../../../common/types";
import { useDispatch, useSelector } from "react-redux";
import '../chatModalAnimations/chatAnimation.css';
import './../../adminTechStylesheet.css';
import './_modal.scss';



import { useLocation } from "react-router-dom";
const TwoModel = (props) => {

    const [modal, setModal] = useState(false);
    const [messageList, setMessageList] = useState([{}]);
    //const [modal, setModal] = useState(true);
    const [show,setShow] = useState(false);
    const [chatInput, setChatInput] = useState("")
    const [userInfo,setUserInfo] = useState(JSON.parse(localStorage.getItem("user")));
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [session, setSession] = useState();



    const user = useSelector((state) => state.authentication.user) || "";
    const location = useLocation();
    useEffect(() => {
        console.log(JSON.stringify(location.state))
        setSession(location.state);
        console.log(JSON.stringify(session));
        //console.log(JSON.stringify(session));
        if (user) {
            const u = JSON.parse(user);
            setName(u.username);

        }
        if(location.state) {
            setUserInfo({
                id: 3,
                username: "hunter",
                aboutMe: null,
                accountType: "admin",
                email: "",
                firstName: "Hunter",
                imageURL: "",
                imgUrl: "",
                lastName: "Risse",
                location: "",
                password: "",
                phone: "",
                registrationDate: 0,
            })
            console.log("%%%% User info =" + JSON.stringify(userInfo) + "%%%%")
        }

    }, [user]);

    // const userModalIdentifcation = name.id;

    const showModal = () => {
        setOpen(true);
        setModal(true);

            //console.log("$$$$$$$$$$$$$$$$$PROPS OF MODAL"+ JSON.stringify(props))
        // console.log("hitting showModal")
        // console.log("USER:" + userInfo);
    }

    const closeModal = () => {
        setOpen(false);
        setModal(false);
        setMessageList([{}]);
        //console.log("hitting closingModal")
    }

    //Modify Message list using new message from tech chat socket
    const callback = (newMessagesArray) => {
        console.log("^^^ new message " + JSON.stringify(newMessagesArray) + "^^^")
        setMessageList((messageList) => messageList.concat(newMessagesArray));
    }

    //Clear the input box
    const clearChatInput = () => {
        setChatInput();
    }

    // function ChatModalRoom() {
    //     const dummy = useRef();
    //     const messagesRef = name.collection('messages');
    //     const query = messagesRef.chatInput;
    //
    //     // const [messages] = useCollectionData(query, {userinfo: 'id'});
    //
    //     const [chatModalAnimation, setChatModalAnimation] = useState('');
    //
    //     const sendMessage = async (e) => {
    //         e.preventDefault();
    //
    //         // const { uid, photoURL } = auth.currentUser;
    //
    //         await messagesRef.add({
    //             text: chatModalAnimation
    //             // createdAt: firebase.firestore.FieldValue.serverTimestamp()
    //             // uid,
    //             // photoURL
    //         })
    //
    //         setChatModalAnimation('');
    //         dummy.current.scrollIntoView({behavior: 'smooth'});
    //     }
    // }


        return (
        <>
            <section className="fade-in-effect">

                <section className="admin-techchat-modal-section">
                    <button className="admin-tech-panel-button" onClick={showModal}>
                        Enter Chat
                    </button>
                </section>

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

                            <h2 className="modal_header-title ">User : {name} | Techie : name  </h2>
                                <button
                                    className="admin-techchat-close-button"
                                    onClick={closeModal}
                                >
                                    x
                                </button>


                            </Modal.Header>

                            <Modal.Body className="modal_content">
                                {messageList.map((message) => (

                                     <p className="message">{message.content}</p>

                                ))}

                            </Modal.Body>
                            <Modal.Footer className="modal_footer">
                                <FormControl
                                    type="text"
                                    name="responseMessage"
                                    value={chatInput}
                                    placeholder="Enter message here"
                                    onChange={(e) =>{ setChatInput(e.target.value)}}
                                />
                                {/*submit the respone an add it the existing one*/}
                                <TechChat messages={messageList} callbackFunction={callback} clearChatInput={clearChatInput} chatInput={chatInput} userInfo={userInfo} session={session} open={open}/>

                            </Modal.Footer>
                            </div>
                        </Modal>
                </section>

            </section>

        </>
    );
};

export default TwoModel;
