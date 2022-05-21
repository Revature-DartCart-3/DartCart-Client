import React from 'react';
import AdminTechPage from "../../features/admin/AdminTechPage";
import FinalAdminTechChat from "./finalAdminSub/FinalAdminTechChat";
import FinalAdminShop from "./finalAdminSub/FinalAdminShop";

const FinalAdminHub = () => {
    return (
        <>

            <FinalAdminShop/>

            <FinalAdminTechChat/>


        </>
    );
};

export default FinalAdminHub;