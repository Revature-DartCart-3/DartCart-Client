import { hasExpectedRequestMetadata } from "@reduxjs/toolkit/dist/matchers"
import { render } from "@testing-library/react";
import React, {useEffect, useState} from  'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import ConversationList from "./techChatRelatedItems/ConversationList";

function TechChat (props) {
    const userId = 1;

    const onConnected = () =>{
        console.log('Connected to Socked');
    }

    const onError = (error) => {
        console.log('Error connecting to socket:' + error);
    }

    //Connect to a web Socket
    const connect =()=>{
        let Sock = new SockJS('http://localhost:9005/ws');
        let stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
        
        //Subscribe to endpoint  {destination, callback function}
        stompClient.subscribe('/chatroom/public', onPrivateMessage);
        //stompClient.subscribe('/secured/room/' + userId, onPrivateMessage);
        //stompClient.subscribe('/user/'+1+'/private', onPrivateMessage);
    }

    //Handle private message
    const onPrivateMessage = (payload) => {
        console.log("Recieved private Message:" + payload);

    }


/*     //const port = process.env.TECHCHAT_PORT;
    const port = 9005;
    const [isConnected, setIsConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    const ws = new W3CWebSocket(`ws://localhost:${port}/techchat`);

    useEffect(()=>{
        ws.send(JSON.stringify({content:props.content}))

    },[props]) 

    ws.onmessage = (message) => {
        console.log(message);
        setMessages(messages + message);
    } */

    
    return(
        <>
            <button onClick={connect}>Connect</button>
            <p>Message:</p>

            <ConversationList/>



        </>
    )
}
export default TechChat;