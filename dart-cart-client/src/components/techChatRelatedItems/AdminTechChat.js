import React from 'react';
import TechChat from "../TechChat";
import {Container} from "react-bootstrap";

const AdminTechChat = () => {
    return (
        <>
            <section>
                <Container>

                    <h2>Tech Support</h2>
                    <TechChat/>

                </Container>

            </section>


        </>
    );
};

export default AdminTechChat;