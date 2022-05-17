import { hasExpectedRequestMetadata } from "@reduxjs/toolkit/dist/matchers"
import { render } from "@testing-library/react";
import React, {useEffect, useState} from  'react';

function TechChat () {
    const [isConnected, setIsConnected] = useState(false);
    let ws = new WebSocket('ws://localhost:3000/techchat');
    useEffect(()=>{
        ws.onmessage = (message) => {
            console.log(message);
        }
    })

    return(
        <>
        </>
    )
}
export default TechChat;