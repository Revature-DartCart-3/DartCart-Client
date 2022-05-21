import React from 'react';
import {Container, Row, Table} from "react-bootstrap";
import{AiOutlineEnter} from 'react-icons/ai';
import {FaUserFriends} from "react-icons/fa";
import {RiAdminFill} from "react-icons/ri";
import {GrStatusDisabled} from "react-icons/gr";
import


const ConversationList = () => {
    return (
        <>

            <Container>
            <Table striped bordered hover responsive>
                <thead>

                    <tr>
                        <th><p className="conversationListTD">Enter</p></th>
                        <th><p className="conversationListTD">Session ID</p></th>
                        <th><FaUserFriends/></th>
                        <th><RiAdminFill/></th>
                        <th><p className="conversationListTD">Pending Status </p></th>
                        <th><p className="conversationListTD">End</p></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="admin-icon-flex-container">
                            {/*<div className="admin-icon-flex-container">*/}
                                <button
                                    type="submit"
                                    className="admin-button-table">
                                    <AiOutlineEnter/>
                                </button>
                            {/*</div>*/}
                            </td>
                        <td><p className="conversationListTD">#</p></td>
                        <td><p className="conversationListTD">#</p></td>
                        <td><p className="conversationListTD">#</p></td>
                        <td><p className="conversationListTD">#</p></td>
                        <td>
                            <button
                                type="submit"
                                className="admin-button-table">
                                <GrStatusDisabled/>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </Table>
            </Container>


        </>
    );
};

export default ConversationList;