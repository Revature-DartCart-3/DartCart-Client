import React from 'react';
import FinalAdminBuySection from "./finalAdminPortalSub/finalAdminBuySection";
import FinalAdminTechSection from "./finalAdminPortalSub/FinalAdminTechSection";
import AdminTwoWayModal from "./finalAdminPortalSub/Modal/AdminTwoWayModal";
import FinalAdminTechPanel from "./finalAdminPortalSub/FinalAdminTechPanel";
import {Container} from "@mui/material";

const FinalAdmin = () => {
    return (
        <>
            <section>
                <Container>
                    <FinalAdminTechPanel/>
                </Container>
            </section>
        </>
    );
};

export default FinalAdmin;