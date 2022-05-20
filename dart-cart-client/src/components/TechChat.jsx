import { render } from "@testing-library/react";
import React, {useEffect, useState} from  'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";

import {over} from 'stompjs';
import SockJS from 'sockjs-client';

var stompClient =null;
function TechChat (props) {
    const username = "jimmy";//Replace with code to retrieve user Id
    const [messages, setMessages] = useState([]);


    const onError = (error) => {
        //console.log('Error connecting to socket:' + error);
    }

    //Connect to a web Socket
    const connect =()=>{
        let Sock = new SockJS('http://localhost:9005/ws');
        stompClient = over(Sock);
        //console.log("**Stomp client assigned" + stompClient.stringify);
        stompClient.connect({}, onConnected, onError);
        
        //Subscribe to endpoint  {destination, callback function}
        //stompClient.subscribe('/chatroom/public', onPrivateMessage);
        
    }

    //Runs after client connects to socket, and subscribes to the dedicated chat for the user
    const onConnected = () =>{
        console.log('Connected to Socket');
        stompClient.subscribe('/user/'+1+'/private', onPrivateMessage);
    }

    //Handle the recieving of a private message
    const onPrivateMessage = (payload) => {
        //console.log("Recieved private Message:" + payload);
        let message = JSON.parse(payload.body);
        //Add message to messages
        setMessages((messages) => messages.concat(message));

    }

    //Send message to other user
    const sendMessage=()=>{
        let message = "Hello";
        //Generate message
        if (stompClient) {
          var chatMessage = {
            senderId: 1,
            recipientId: 1,
            senderName: "jimmy",
            recipientName: "admin",
            content: message

          };
          //Add message to messages
          setMessages((messages) => messages.concat(chatMessage));
          //Send message via socket
          stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
        }
    }


    
    return(
        <>
        <button onClick={connect}>Connect</button>
        <button value={"Hello"} onClick={sendMessage}>Send Message</button>

        <p>Messages:</p>
        {messages.map((message) => (
            <li>{message.senderName}: {message.content}</li>
        ))}

        </>
    )
}
export default TechChat;