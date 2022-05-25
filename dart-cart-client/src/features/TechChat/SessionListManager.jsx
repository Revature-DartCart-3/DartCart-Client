import { render } from "@testing-library/react";
import React, {useEffect, useState} from  'react';

import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import { withStyles } from "@mui/material";

var stompClient = "null";

function SessionListManager (props) {
    const [messages, setMessages] = useState([]);

    //set states to allow this component to modify the parent state
    const sessionList = props.sessionList;
    const setSessionList = props.callback;

    //Upon mounting, connect to sesssion
    useEffect(() => {
        connect();
    },[])




    const onError = (error) => {
        console.log('Error connecting to socket:' + error);
    }

    //Connect to a web Socket
    const connect =()=>{
        let Sock = new SockJS('http://localhost:9005/ws');
        stompClient = over(Sock);
        //console.log("**Stomp client assigned" + stompClient.stringify);
        stompClient.connect({}, onConnected, onError);
        
    }

    const disconnect = () =>{
        stompClient.unsubscribe("privateMessaging");
    }

    //Runs after Tech connects to socket, and subscribes to the session where session updates are sent
    const onConnected = () =>{//Container for Stefan

        //Used for admins to retrieve list of awaiting clients
        //Subscribe to endpoint  {destination, callback function, id}
        //Listen for updates on chat queue
        stompClient.subscribe('/chatroom/techies', onSessionUpdate);
    }   

    //Handle session queue changing
    const onSessionUpdate = (payload) => {
        let sessionUpdate = JSON.parse(payload.body);
        let newSession = {sessionId: sessionUpdate.sessionId, client: {id: sessionUpdate.senderId, username: sessionUpdate.senderName}}
        console.log(newSession);
        switch (sessionUpdate.type) {
            case "RemoveSession":
                let sessions = [...sessionList]
                //setSessionList(sessionList.filter((session) => session.sessionId != sessionUpdate.sessionId));
                break;
            case "NewClient":
                setSessionList((sessionList) => [...sessionList, newSession]);
                break;
            default:
                console.log("Unhandled Mesage: " + sessionUpdate);
                break;
                
        }
    }
   
    return(
        <>
        </>
    )
}
export default SessionListManager;