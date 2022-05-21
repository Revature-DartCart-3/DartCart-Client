import { render } from "@testing-library/react";
import React, {useEffect, useState} from  'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";

import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import { withStyles } from "@mui/material";

var stompClient =null;

/* 
The messages are saved in the messages state.

*/



function TechChat (props) {
    const [isConnected, setIsConnected] = useState(false);
    const username = "jimmy";//Replace with code to retrieve user Id
    const [messages, setMessages] = useState([]);
    const [userId, setUserId] = useState(1);
    const [sessionId, setSessionId] = useState(0);
    const [message, setMessage] = useState("My products aren't displaying properly");
    
    

    var chatMessage = {
        sessionId: sessionId,
        senderId: userId,
        recipientId: 1,
        senderName: "jimmy",
        recipientName: "admin",
        content: message

      };

    const onError = (error) => {                                        //      For Stefan
        //console.log('Error connecting to socket:' + error);
    }

    //Connect to a web Socket
    const connect =()=>{                                                //      Container For Stefan
        let Sock = new SockJS('http://localhost:9005/ws');
        stompClient = over(Sock);                                       //      For Stefan
        //console.log("**Stomp client assigned" + stompClient.stringify);
        stompClient.connect({}, onConnected, onError);                  //      For Stefan
        

        
        
    }

    const leave = () => {
        setMessages((messages) => messages.concat({senderName: "Automated System" ,content: "You Have Left The Chat"}));
        disconnect();
    }

    const disconnect = () =>{
        stompClient.send("/app/disconnect", {}, JSON.stringify(chatMessage));
        stompClient.unsubscribe("privateMessaging");
        setIsConnected(false);
        
    }

    //Runs after client connects to socket, and subscribes to the dedicated chat for the user
    const onConnected = () =>{//Container for Stefan
        console.log('Connected to Socket');

        

        //Listen to users private message socket and store the subscription
        //Subscribe to endpoint  {destination, callback function, id}
        stompClient.subscribe('/user/' + userId + '/private', onPrivateMessage ,{ id: "privateMessaging"});
        //subscription();
        

        //stompClient.subscribe('/chatroom/techies', onPrivateMessage); //Used for admins to retrieve list of awaiting clients      For Stefan

        //Send request for help to techies
        console.log(chatMessage);
        stompClient.send("/app/help-request", {}, JSON.stringify(chatMessage));
        setIsConnected(true);
    }

    //Handle the recieving of a private message
    const onPrivateMessage = (payload) => {
        console.log("Recieved private Message:" + payload.body);
        let message = JSON.parse(payload.body);
        
        //Check if message is from automated system
        if(message.senderId == 0) {
            setSessionId(message.sessionId);
            console.log("Automated system sent message. " + message.sessionId);
            switch (message.content) {
                case "Disconnected":
                    disconnect();
                    message.content = "Tech has left the Chat";
                    setMessages((messages) => messages.concat(message));
                    return;
            
                default:
                    break;
            }
            
        }
        //Add message to messages
        setMessages((messages) => messages.concat(message));

    }
    

    //Send message to other user
    const sendMessage=()=>{
        //Generate message
        if (stompClient) {
/*           var chatMessage = {
            senderId: userId,
            recipientId: 1,
            senderName: "jimmy",
            recipientName: "admin",
            content: message

          }; */
          //Add message to messages
          setMessages((messages) => messages.concat(chatMessage));
          //Send message via socket
          stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
        }
    }
   
    return(
        <>
        {isConnected ? <button value={"Hello"} onClick={leave}>disconnect</button> : <button onClick={connect}>Connect</button>}
        <button value={"Hello"} onClick={sendMessage}>Send Message</button>
        

        <p>Messages:</p>
        {messages.map((message) => (
            <li>{message.senderName}: {message.content}</li>
        ))}
        </>
    )
}
export default TechChat;