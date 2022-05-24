import { render } from "@testing-library/react";
import React, {useEffect, useState} from  'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";

import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import { withStyles } from "@mui/material";
import axios from "axios";
import {Form, Modal} from "react-bootstrap";
import FinalAdminTechPanel from "./finalAdminPortal/finalAdminPortalSub/FinalAdminTechPanel";

var stompClient =null;

/* 
The messages are saved in the messages state.

*/

function FinalTechChat (props) {
    const [isConnected, setIsConnected] = useState(false);
    const username = "jimmy";//Replace with code to retrieve user Id
    //const [messages, callback] = [props.messages, props.callback];
    const [userId, setUserId] = useState(1);
    const [sessionId, setSessionId] = useState(0);
    const [message, setMessage] = useState("My products aren't displaying properly");
    const callback = props.callbackFunction;
    const userInfo = props.userInfo;
    let isTech;
    
    //WEBSOCKET FUNCTIONS
    var chatMessage = {
        sessionId: sessionId,
        type: "Message",
        senderId: userInfo.id,
        recipientId: 1,
        senderName: userInfo.username,
        recipientName: "admin",
        content: props.ChatInput
      };

    const onError = (error) => {
        //console.log('Error connecting to socket:' + error);
    }



    //Connect to a web Socket
    const connect =()=>{
        console.log(userInfo)
        let Sock = new SockJS('http://localhost:9005/ws');
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    }

    const leave = () => {
        callback({senderName: "Automated System" ,content: "You Have Left The Chat"});
        disconnect();
    }

    const disconnect = () =>{
        console.log("*****Leaving Chat*****"+ chatMessage);
        stompClient.send("/app/disconnect", {}, JSON.stringify(chatMessage));
        stompClient.unsubscribe("privateMessaging");
        setIsConnected(false);
    }

    //Runs after client connects to socket, and subscribes to the dedicated chat for the user
    const onConnected = () =>{
        console.log('Connected to Socket');

        //Listen to users private message socket and store the subscription
        //{Subscribe to endpoint  {destination, callback function, id}}
        stompClient.subscribe('/user/' + userId + '/private', onPrivateMessage ,{ id: "privateMessaging"});

        //stompClient.subscribe('/chatroom/techies', onPrivateMessage); //Used for admins to retrieve list of awaiting clients

        //Send request for help to techies if not a techie yourself
        if(!isTech) stompClient.send("/app/help-request", {}, JSON.stringify(chatMessage));
        setIsConnected(true);
    }


    //Handle the recieving of a private message
    const onPrivateMessage = (payload) => {
        console.log("Recieved private Message:" + payload.body);
        let message = JSON.parse(payload.body);
        
        //Check if message is from automated system
        if(message.senderId == 0) {
            setSessionId(message.sessionId);
            console.log("Automated system sent message. " + message.type);
            switch (message.type) {
                case "Disconnected":
                    disconnect();
                    message.content = "Tech has left the Chat";
                    props.callbackFunction(message);

                    return;
                case "Created":
                    chatMessage.sessionId = message.sessionId;
                    break;
                case "Join":
                    //Get session information from session response
                    let sessionResponse = JSON.parse(message.content);
                    chatMessage.recipientId = sessionResponse.techId;
                    chatMessage.recipientName = sessionResponse.techName;
                default:
                    break;
            }
            
        }
        //Add message to messages
        props.callbackFunction(message);
    }

    //Send message to other user
    const sendMessage=()=>{
        //Generate message
        if (stompClient) {

          //Add message to messages
          callback(message);
          //Send message via socket
          stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
        }
    }

    //handle mounting
    useEffect(() => {
        //Check if they are a tech
        const adminNames = ["admin","techie"];
        isTech = adminNames.includes(userInfo.accountType) ? true : false;
        //console.log("Found user to be" + userInfo.type + "are they allowed?" + isTech)
        connect();
    },[])

    //handle unmounting
    useEffect(() => () =>  {
        console.log("**Unmount**");
        disconnect();
    }, [])
   
    return(
        <>
        {/* {messages}; */}
        {/* {isConnected ? <button value={"Hello"} onClick={leave}>disconnect</button> : <button onClick={connect}>Connect</button>} */}
        <button value={"Hello"} onClick={sendMessage}>Send Message</button>
        </>
    )
}
export default FinalTechChat;