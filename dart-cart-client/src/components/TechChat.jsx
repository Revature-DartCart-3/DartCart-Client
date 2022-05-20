import { render } from "@testing-library/react";
import React, {useEffect, useState} from  'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";

import {over} from 'stompjs';
import SockJS from 'sockjs-client';

var stompClient =null;

/* 
The messages are saved in the messages state.

*/



function TechChat (props) {
    const username = "jimmy";//Replace with code to retrieve user Id
    const [messages, setMessages] = useState([]);
    const [userId, setUserId] = useState(1);
    const [message, setMessage] = useState("My products aren't displaying properly");


    const onError = (error) => {
        //console.log('Error connecting to socket:' + error);
    }

    //Connect to a web Socket
    const connect =()=>{
        let Sock = new SockJS('http://localhost:9005/ws');
        stompClient = over(Sock);
        //console.log("**Stomp client assigned" + stompClient.stringify);
        stompClient.connect({}, onConnected, onError);
        

        
        
    }

    //Runs after client connects to socket, and subscribes to the dedicated chat for the user
    const onConnected = () =>{
        console.log('Connected to Socket');

        //Listen to users private message socket
        //Subscribe to endpoint  {destination, callback function}
        stompClient.subscribe('/user/' + userId + '/private', onPrivateMessage);
        

        //stompClient.subscribe('/chatroom/techies', onPrivateMessage); //Used for admins to retrieve list of awaiting clients

        //Send request for help to techies
        stompClient.send("/app/help-request", {}, JSON.stringify({senderId: userId}));
    }

    //Handle the recieving of a private message
    const onPrivateMessage = (payload) => {
        console.log("Recieved private Message:" + payload);
        let message = JSON.parse(payload.body);
        //Add message to messages
        setMessages((messages) => messages.concat(message));

    }

    //Send message to other user
    const sendMessage=()=>{
        //Generate message
        if (stompClient) {
          var chatMessage = {
            senderId: userId,
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