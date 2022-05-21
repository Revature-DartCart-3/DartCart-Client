import React from 'react';
import {Container, Table} from "react-bootstrap";


const ConversationList = () => {
    return (
        <>

            <Container>
            <Table responsive>
                <thead>
                    <td><p className="conversationListTD">Enter</p></td>
                    <td><p className="conversationListTD">Session ID</p></td>
                    <td><p className="conversationListTD">Client ID</p></td>
                    <td><p className="conversationListTD">Techie ID</p></td>
                    <td><p className="conversationListTD">Pending Status </p></td>
                    <td><p className="conversationListTD">End</p></td>

                </thead>
                <tbody>
                    <td><p className="conversationListTD">Enter</p></td>
                    <td><p className="conversationListTD">#</p></td>
                    <td><p className="conversationListTD">#</p></td>
                    <td><p className="conversationListTD">#</p></td>
                    <td><p className="conversationListTD">#</p></td>
                    <td><p className="conversationListTD">End</p></td>
                </tbody>
            </Table>
            </Container>


        </>
    );
};

export default ConversationList;