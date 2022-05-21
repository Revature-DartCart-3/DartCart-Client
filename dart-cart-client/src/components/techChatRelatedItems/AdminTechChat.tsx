import React from 'react';
import TechChat from "../TechChat";
import {Container} from "react-bootstrap";
import ConversationList from "./ConversationList";
import AdminTechPage from "../../features/admin/AdminTechPage";

const AdminTechChat = () => {
    return (
        <>
            <section>
                <Container>

                    <h2>Tech Support</h2>

                        <AdminTechPage/>

                    <TechChat/>

                    <ConversationList/>

                </Container>

            </section>
        </>
    );
};

export default AdminTechChat;