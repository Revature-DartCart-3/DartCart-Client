import { render } from "@testing-library/react";
import React, {useEffect, useState} from  'react';

import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import { withStyles } from "@mui/material";

var stompClient = null;

/* 
The messages are saved in the messages state.
*/

function TechChat (props) {
    const [isConnected, setIsConnected] = useState(false);
    const username = "jimmy";//Replace with code to retrieve user Id
    //const [messages, callback] = [props.messages, props.callback];
    const [userId, setUserId] = useState(1);
    const [sessionId, setSessionId] = useState();
    const [message, setMessage] = useState("My products aren't displaying properly");
    const [recipientName, setRecipientName] = useState("");
    const [recipientId, setRecipientId] = useState();
    const callback = props.callbackFunction;
    const userInfo = props.userInfo;
    let isTech;
    
    //WEBSOCKET FUNCTIONS
    var chatMessage = {
        sessionId: sessionId,
        type: "Message",
        senderId: userInfo.id,
        recipientId: recipientId,
        senderName: userInfo.username,
        recipientName: recipientName,
        content: props.chatInput
      };

    console.log("Chat Queue Session Id" + sessionId)

    const onError = (error) => {
        //console.log('Error connecting to socket:' + error);
    }

    //Connect to a web Socket
    const connect =()=>{
        let Sock = new SockJS('http://localhost:9005/ws');
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    }

    const leave = () => {
        callback({senderName: "Automated System" ,content: "You Have Left The Chat"});
        disconnect();
    }

    const disconnect = () =>{
            var chatMessage = {
        sessionId: sessionId,
        type: "Message",
        senderId: userInfo.id,
        recipientId: recipientId,
        senderName: userInfo.username,
        recipientName: recipientName,
        content: props.chatInput
      };
        console.log(sessionId);
        console.log("*****Leaving Chat*****"+ JSON.stringify(chatMessage));
        //let disconnectMessage = chatMessage;
        //disconnectMessage.content ="Disconnected";
        //stompClient.send("/app/disconnect", {}, JSON.stringify(disconnectMessage));
        stompClient.send("/app/disconnect", {}, JSON.stringify(chatMessage));
        stompClient.unsubscribe("privateMessaging");
        setIsConnected(false);
    }

    //Runs after client connects to socket, and subscribes to the dedicated chat for the user
    const onConnected = () =>{
        //Listen to users private message socket and store the subscription
        //{Subscribe to endpoint  {destination, callback function, id}}
        stompClient.subscribe('/user/' + userInfo.id + '/private', onPrivateMessage ,{ id: "privateMessaging"});

        //stompClient.subscribe('/chatroom/techies', onPrivateMessage); //Used for admins to retrieve list of awaiting clients

        //Send request for help to techies if not a techie yourself
        if(!isTech) stompClient.send("/app/help-request", {}, JSON.stringify(chatMessage));
        setIsConnected(true);
    }


    //Handle the recieving of a private message
    const onPrivateMessage = (payload) => {
        //console.log("Recieved private Message:" + payload.body);
        let message = JSON.parse(payload.body);
        
        //Check if message is from automated system
        if(message.type != "Message") {
            //setSessionId(message.sessionId);
            console.log("Automated system sent message. " + message.type);
            switch (message.type) {
                case "Disconnected":
                    disconnect();
                    message.content = "Tech has left the Chat";
                    props.callbackFunction(message);

                    return;
                case "Created":
                    console.log(message.sessionId);
                    //setSessionId(message.sessionId);
                    break;
                case "Join":
                    //Get session information from session response
                    console.log(message)
                    setRecipientId(message.senderId);
                    setRecipientName(message.senderName);
                    message.content = "Tech " + message.senderName + " Has joined the chat";
                    props.callbackFunction(message);
                    return;
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
          callback(chatMessage);
          //Send message via socket
          stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
          props.clearChatInput();
        }
    }

    //handle mounting
    useEffect(() => {
        //Determine whether to run connect or disconnect
        if(props.open){
        //Check if they are a tech
        const adminNames = ["admin","techie"];
        isTech = adminNames.includes(userInfo.accountType) ? true : false;
         if(props.session) {
             console.log("**************************************************************************************");            
             console.log(props.session);
             setSessionId(props.session.sessionId);
             setRecipientId(props.session.clientId);
             setRecipientName(props.session.clientName);
             console.log(props.session.sessionId);
         }
         //setSessionId(props.session.sessionId);
        console.log("Found user to be" + userInfo.accountType + "are they allowed?" + isTech)
        console.log(sessionId);
        connect();
        }
        else {
            console.log("**Unmount**");
            disconnect();
        }
    },[props.open])
   
    return(
        <>
        <button value={"Hello"} onClick={sendMessage}>Send Message</button>
        </>
    )
}
export default TechChat;