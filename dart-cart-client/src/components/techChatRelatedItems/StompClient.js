import React from 'react';
import {SockJS, Stomp} from 'sockjs'

const StompClient = () => {

    var socket = new SockJS('/secured/room');
    var stompClient = Stomp.over(socket);
    var sessionId = "";

    stompClient.connect({}, function (frame) {
        var url = stompClient.ws._transport.url;
        url = url.replace(
            "ws://localhost:8080/spring-security-mvc-socket/secured/room/",  "");
        url = url.replace("/websocket", "");
        url = url.replace(/^[0-9]+\//, "");
        console.log("Your current session is: " + url);
        sessionId = url;
    })

    return (
        <>
            <h1>Stomp Client</h1>

        </>
    );
};

export default StompClient;