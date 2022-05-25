import React from 'react';
import AdminTechSection from "./finalAdminPortalSub/AdminTechSection";
import AdminTechPanel from "./finalAdminPortalSub/AdminTechPanel";
import {Container} from "@mui/material";

const Admin = () => {
    return (
        <>
            <section>
                <Container>
                    <AdminTechPanel/>
                </Container>
            </section>
        </>
    );
};

export default Admin;