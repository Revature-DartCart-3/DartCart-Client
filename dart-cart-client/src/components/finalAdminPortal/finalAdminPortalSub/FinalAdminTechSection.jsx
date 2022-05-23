import React from 'react';
import AdminComments from "../../../features/TechChatModal/AdminComments";
import FinalAdminTechPanel from "./FinalAdminTechPanel";
import FinalTwoWayChatModal from "./FinalTwoWayChatModal";

const FinalAdminTechSection = () => {
    return (
        <>

            <h1> Admin Tech Support</h1>
            {/*TARGET WHY THIS ISNT'T WORKING*/}
            <FinalTwoWayChatModal/>
            <FinalAdminTechPanel/>


        </>
    );
};

export default FinalAdminTechSection;