import React, {useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import {Table} from "react-bootstrap";
import axios from "axios";
import SessionListManager from "../../SessionListManager";

const FinalAdminTechPanel = () => {

    const [sessionList, setSessionList] = useState([]);
    const [enterChat, setEnterChat] = useState([]);
    const [deleteChat, setDeleteChat] = useState([]);

    useEffect(({sessionList, setSessionList}) => {

        getAllAvailableChats();

    }, [])


    async function getAllAvailableChats() {
        await axios.get("/help-request-list")
            .then( response => {
                setSessionList(response.data);
            });
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
                            <th>Enter</th>
                            <th>User</th>
                            <th>Session</th>
                            <th>Tech</th>
                            <th>Delete</th>
                        </tr>
                       </thead>
                        <tbody>
                        {sessionList &&
                            sessionList.map((list, index) => {
                                return (

                                    <tr key={list.sessionId}>
                                        {/*<-------- enter button response*/}
                                        <td>Enter</td>
                                        <td>{list.sessionId}</td>
                                        <td>{list.client.id}</td>
                                        <td>{list.client.username}</td>
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