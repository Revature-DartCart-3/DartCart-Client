import { hasExpectedRequestMetadata } from "@reduxjs/toolkit/dist/matchers"
import { render } from "@testing-library/react";
import React, {useEffect, useState} from  'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";

function TechChat (props) {
    const port = process.env.TECHCHAT_PORT;
    const [isConnected, setIsConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    const ws = new W3CWebSocket(`ws://localhost:${port}/techchat`);

/*     useEffect(()=>{
        ws.send(JSON.stringify({}))

    },[props]) */

    ws.onmessage = (message) => {
        console.log(message);
        setMessages(messages + message);
    }

    return(
        <>
        <p>Message:{messages}</p>
        </>
    )
}
export default TechChat;