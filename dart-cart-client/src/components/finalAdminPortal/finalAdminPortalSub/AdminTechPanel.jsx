import React, {useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import {Table} from "react-bootstrap";
import axios from "axios";
import SessionListManager from "../../../features/TechChat/SessionListManager";
import {AiOutlineEnter} from "react-icons/ai";
import {BsAlignEnd} from "react-icons/bs";
import { useNavigate} from "react-router-dom";

const AdminTechPanel = () => {

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

    function disconnectConversation(e){
        let sessionToDelete = JSON.parse(e.target.value);
        axios.delete(`http://localhost:9005/delete?session=${sessionToDelete.sessionId}` )
            .then((response) => {
                setDeleteChat(response.data);
                setSessionList(sessionList.filter((session) => session.sessionId != sessionToDelete.sessionId));
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
                                                className=""
                                                value={JSON.stringify(list)}
                                                name="session"
                                                onClick={assignTechToChat}
                                                type="submit"
                                            >
                                                enterChat
                                                {/* {activeSession == list.sessionId && <TempTwoModel session={list} />} */}
                                                {/* <AiOutlineEnter/> */}
                                            </button>
                                        </td>
                                        <td>{list.sessionId}</td>
                                        <td>{list.client.id}</td>
                                        <td>{list.client.username}</td>
                                        <td className="admin-tech-panel-button-group admin-icon-color">
                                            <button
                                                className="admin-tech-panel-button"
                                            value={[JSON.stringify(list)]}
                                                onClick={disconnectConversation}
                                                type="submit"
                                            >

                                                Delete
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

export default AdminTechPanel;