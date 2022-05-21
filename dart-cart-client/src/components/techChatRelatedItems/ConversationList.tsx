import React from 'react';
import {Container, Row, Table} from "react-bootstrap";


const ConversationList = () => {
    return (
        <>

            <Container>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>

                        <th><p className="conversationListTD">Enter</p></th>
                        <th><p className="conversationListTD">Session ID</p></th>
                        <th><p className="conversationListTD">Client ID</p></th>
                        <th><p className="conversationListTD">Techie ID</p></th>
                        <th><p className="conversationListTD">Pending Status </p></th>
                        <th><p className="conversationListTD">End</p></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><p className="conversationListTD">Enter</p></td>
                        <td><p className="conversationListTD">#</p></td>
                        <td><p className="conversationListTD">#</p></td>
                        <td><p className="conversationListTD">#</p></td>
                        <td><p className="conversationListTD">#</p></td>
                        <td><p className="conversationListTD">End</p></td>
                    </tr>
                </tbody>
            </Table>
            </Container>


        </>
    );
};

export default ConversationList;