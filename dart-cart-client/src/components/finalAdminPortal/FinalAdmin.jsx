import React from 'react';
import FinalAdminBuySection from "./finalAdminPortalSub/finalAdminBuySection";
import FinalAdminTechSection from "./finalAdminPortalSub/FinalAdminTechSection";
import AdminTwoWayModal from "./finalAdminPortalSub/Modal/AdminTwoWayModal";
import FinalAdminTechPanel from "./finalAdminPortalSub/FinalAdminTechPanel";

const FinalAdmin = () => {
    return (
        <>
            <AdminTwoWayModal/>

            <FinalAdminTechPanel/>

        </>
    );
};

export default FinalAdmin;