import React from 'react';
import TechChat from "../TechChat";
import {Container} from "react-bootstrap";
import ConversationList from "./ConversationList";

const AdminTechChat = () => {
    return (
        <>
            <section>
                <Container>

                    <h2>Tech Support</h2>
                    <TechChat/>
                    {/*NOT WORKING INSIDE TECHCHAT???*/}
                    {/*IT WORKS HERE THOUGH*/}
                    {/*TEMP HERE FOR NOW*/}
                    <ConversationList/>

                </Container>

            </section>
        </>
    );
};

export default AdminTechChat;