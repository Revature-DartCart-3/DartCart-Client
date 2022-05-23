import React, {useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import {Table} from "react-bootstrap";
import axios from "axios";
import SessionListManager from "../../SessionListManager";
import {AiOutlineEnter} from "react-icons/ai";
import {BsAlignEnd} from "react-icons/bs";

const FinalAdminTechPanel = () => {

    const [sessionList, setSessionList] = useState([]);
    const [enterChat, setEnterChat] = useState({
        sessionId : "",
        clientId : ""
    });
    const [deleteChat, setDeleteChat] = useState({
        sessionId : ""
    });

    useEffect(() => {

        getAllAvailableChats();

    }, [])

    function getAllAvailableChats() {
        axios.get("http://localhost:9005/help-request-list")
            .then( response => {
                setSessionList(response.data);
            });
    }

    function assignTechToChat() {
       axios.put("http://localhost:9005/assign-tech/")
            .then((response) => {
                setEnterChat(response.data);
            })
            alert("A tech representative has been assigned.");
    }

    function disconnectConversation(){
        axios.delete("http://localhost:9005/disconnect")
            .then((response) => {
                setDeleteChat(response.data);
            })
    }

    return (
        <>
            <SessionListManager sessionList={sessionList} callback={setSessionList} />

            <h1>Chat Queue</h1>

            <section>
                <Container>
                    <Table>
                       <thead>
                        <tr>
                            <th><p>Enter</p></th>
                            <th><p>User</p></th>
                            <th><p>Session</p></th>
                            <th><p>Tech</p></th>
                            <th><p>Delete</p></th>
                        </tr>
                       </thead>
                        <tbody>
                        {sessionList &&
                            sessionList.map((list, index) => {
                                return (
                                    <tr key={list.sessionId}>
                                        {/*<-------- enter button response*/}
                                        <td classname="admin-tech-panel-button">
                                            <button
                                                value={JSON.stringify(list)}
                                                onClick={assignTechToChat}
                                                type="submit"
                                            >
                                                <AiOutlineEnter/>
                                            </button>
                                        </td>
                                        <td>{list.sessionId}</td>
                                        <td>{list.client.id}</td>
                                        <td>{list.client.username}</td>
                                        <td className="admin-tech-panel-button">
                                            <button
                                                value={JSON.stringify(list)}
                                                onClick={disconnectConversation}
                                                type="submit"
                                            >
                                                <BsAlignEnd/>
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