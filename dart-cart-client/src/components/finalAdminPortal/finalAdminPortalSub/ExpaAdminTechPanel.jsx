import React, {useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import {Table} from "react-bootstrap";
import axios from "axios";

const ExpaAdminTechPanel = () => {

    const [available, setAvailable] = useState([]);
    const [enterChat, setEnterChat] = useState([]);
    const [deleteChat, setDeleteChat] = useState([]);

    useEffect(() => {

        getAllAvailableChats();

    }, [])


    async function getAllAvailableChats() {
        await axios.get("/help-request-list")
            .then( response => {
                setAvailable(response);
            });
    }


    return (
        <>
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

                        {/**/}
                        <tbody>
                            <tr>
                                <td></td>
                            </tr>
                        </tbody>

                    </Table>


                </Container>
            </section>



        </>
    );
};

export default ExpaAdminTechPanel;