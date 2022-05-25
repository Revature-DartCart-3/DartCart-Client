import React, {useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import {Table} from "react-bootstrap";
import axios from "axios";
import SessionListManager from "../../SessionListManager";
import {AiOutlineEnter} from "react-icons/ai";
import {BsAlignEnd} from "react-icons/bs";
import TempTwoModel from "./Modal/TempTwoModel"
import { useNavigate} from "react-router-dom";

const FinalAdminTechPanel = () => {

    const [sessionList, setSessionList] = useState([]);
    const [activeSession, setActiveSession] = useState();
    const [enterChat, setEnterChat] = useState({
        sessionId : "",
        clientId : ""
    });
    const [deleteChat, setDeleteChat] = useState({
        sessionId : ""
    });
    const navigate = useNavigate();
    const [userInfo,setUserInfo] = useState(JSON.parse(localStorage.getItem("user")));

    useEffect(() => {
        console.log("Rendering Component")
        getAllAvailableChats();
    }, [])

    function getAllAvailableChats() {
        axios.get("http://localhost:9005/help-request-list")
            .then( response => {
                setSessionList(response.data);
                //console.log(response.data)
            });
    }

    function assignTechToChat(e) {
        let session = JSON.parse(e.target.value);
        let sessionResponse = {
            sessionId: session.sessionId,
            techId: 3,//userInfo.id ,
            techName: "hunter",//userInfo.username,

            clientId: session.client.id,
            clientName: session.client.username
            
        }
        console.log(JSON.stringify(sessionResponse));

        axios.put("http://localhost:9005/assign-tech",sessionResponse)
            .then((response) => {
                setEnterChat(response.data);
                // setActiveSession(response.data.sessionId);
                // console.log(response.data.sessionId);
                navigate("/techchatmodal", {state: response.data});
            })
            alert("A tech representative has been assigned.");
    }

    function disconnectConversation(){
        axios.delete("http://localhost:9005/disconnect")
            .then((response) => {
                setDeleteChat(response.data);
            })
    }

    console.log()

    return (
        <>
            <SessionListManager sessionList={sessionList} callback={setSessionList} />

            <h1>Chat Queue</h1>

            <section>
                <Container>
                    <Table striped bordered hover className="admin-table">
                       <thead>
                        <tr>
                            <th ><p>Enter</p></th>
                            <th><p>Session ID</p></th>
                            <th><p>User ID</p></th>
                            <th><p>Username</p></th>
                            <th><p>Delete</p></th>
                        </tr>
                       </thead>
                        <tbody>
                        {sessionList &&
                            sessionList.map((list, index) => {
                                return (
                                    <tr key={list.sessionId}>
                                        {/*<-------- enter button response*/}
                                        <td className="admin-tech-panel-button-group">
                                            <button
                                                className="admin-tech-panel-button"
                                                value={JSON.stringify(list)}
                                                name="session"
                                                onClick={assignTechToChat}
                                                type="submit"
                                            >
                                                Enter Chat
                                                {/* <TempTwoModel session={list} /> */}
                                                {/* {activeSession == list.sessionId && <TempTwoModel session={list} />} */}
                                                {/* <AiOutlineEnter/> */}
                                            </button>
                                        </td>
                                        <td>{list.sessionId}</td>
                                        <td>{list.client.id}</td>
                                        <td>{list.client.username}</td>
                                        <td className="admin-tech-panel-button-group">
                                            <button
                                                className="admin-tech-panel-button"
                                            value={JSON.stringify(list)}
                                                onClick={disconnectConversation}
                                                type="submit"
                                            >
                                                <BsAlignEnd className="admin-icon-color"/>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </Table>
                </Container>
            </section>
        </>
    );
};

export default FinalAdminTechPanel;