// import { hasExpectedRequestMetadata } from "@reduxjs/toolkit/dist/matchers"
import { render } from "@testing-library/react";
import React, {useEffect, useState} from  'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";

function TechChat (props) {
    const port = process.env.TECHCHAT_PORT;
    const [isConnected, setIsConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    const ws = new W3CWebSocket(`ws://localhost:3000/secured/room`);

    useEffect(() => {

        //SET THE STAGE FOR USER ENTERING (BUTTON AND SIMPLE FORM -- FOR TESTING PURPOSES)
        //1) GET USER'S ID UPON ENTERING THE CHAT(PRESSING THE BUTTON)
        //--- IT WILL CREATE SESSION ID
        //--- IT


        // setMessages("Hello");

    }, []);


    ws.onmessage = (message) => {
        console.log(message);
        setMessages(messages + message);
    }


     function createSession() {
        //NEED TO FIND THE EQUIVALENT OF AXIOS CALL WITH WEBSCOOTES
         //USE CONNECT(), DISCONECT()

         setMessages(
             "will add the onopen stuff here"



         )

         ws.onopen = () => {


         }



         }



    return(
        <>
            <p>Message:{messages}</p>
            <button
                //MAKE A PARMETER FOR THE USERID OR STATE WITH WS
                onClick={createSession}
            >
                Enter Chat
            </button>
        </>
    )
}
export default TechChat;