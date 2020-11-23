import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';
import Chat from './components/chat/chat';
import Welcome from './components/welcome/welcome';
import Header from './components/header/header';

function App() {
  // notice that we pass a callback function to initialize the socket
  // we don't need to destructure the 'setSocket' function since we won't be updating the socket state
    const [socket] = useState(() => io(':8000'));

    useEffect(() => {
        // we need to set up all of our event listeners
        // in the useEffect callback function
        console.log('Is this running?');
        socket.on('Welcome', data => console.log(data));


        // note that we're returning a callback function
        // this ensures that the underlying socket will be closed if App is unmounted
        // this would be more critical if we were creating the socket in a subcomponent
        return () => socket.disconnect(true);
    }, [socket]);

    const sendToast = (name) => {
        const io = require('socket.io-client');
        const socket = io('http://localhost:8000');
        socket.emit('toast', name);
    }

    const [ hideChat, setHideChat ] = useState();


    const openChatHandler = (username) => {
        setHideChat(false);
        //toast username
        sendToast(username);
    }



    return (
        <div className="App">
            <Header />
            <Welcome usernameSubmitHandler={ openChatHandler } hidden={ !hideChat } />
            <Chat hidden={ hideChat } />
        </div>
    );
}

export default App;