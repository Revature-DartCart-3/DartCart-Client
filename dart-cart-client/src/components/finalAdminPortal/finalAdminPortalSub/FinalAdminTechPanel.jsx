import React, {useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import {Table} from "react-bootstrap";
import axios from "axios";
import SessionListManager from "../../SessionListManager";
import {AiOutlineEnter} from "react-icons/ai";
import {BsAlignEnd} from "react-icons/bs";

const FinalAdminTechPanel = () => {

    const [sessionList, setSessionList] = useState([]);
    const [enterChat, setEnterChat] = useState([]);
    const [deleteChat, setDeleteChat] = useState([]);

    useEffect(() => {

        getAllAvailableChats();

    }, [])


    async function getAllAvailableChats() {
        await axios.get("http://localhost:9005/help-request-list")
            .then( response => {
                setSessionList(response.data);
            });
    }

    async function assignTechToChat() {
        await axios.put("http://localhost:9005/assign-tech")
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
                                                onClick=""
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
                                                onClick=""
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