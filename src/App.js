import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';
import Chat from './components/chat/chat';
import Welcome from './components/welcome/welcome';
import Header from './components/header/header';

function App() {
  // notice that we pass a callback function to initialize the socket
  // we don't need to destructure the 'setSocket' function since we won't be updating the socket state

    const [ socket ] = useState(() => io(':8000'));
    const [ hideChat, setHideChat ] = useState();
    const [ username, setUsername ] = useState();
    const [ warning, setWarning ] = useState('');

    useEffect(() => {
        setHideChat(true);

        // we need to set up all of our event listeners
        // in the useEffect callback function
        console.log('Is this running?');
        socket.on('Welcome', data => console.log(data));

        // note that we're returning a callback function
        // this ensures that the underlying socket will be closed if App is unmounted
        // this would be more critical if we were creating the socket in a subcomponent
        // setUsername(username);
        
        socket.on('toastFail', (name, msg) => {
            setHideChat(true);
            setWarning(msg);
            setUsername(name);
        });
        
        socket.on('toastSuccess', (name) => {
            setHideChat(false);
            setUsername(name);
        })
        console.log('username sent to free up: ' + socket.id);

        socket.emit('freeUpName', socket.id);
        // return socket.disconnect(true);
    }, []);

    const sendToast = (name) => {
        //emit name for the server to toast
        socket.emit('toastOut', name, socket.id);
    }

    const openChatHandler = (uname) => {
        //toast username
        console.log('activated openChatHandler in App.js with name: ' + uname)
        setUsername(uname);
        sendToast(uname);
    }




    return (
        <div className="App">
            <Header />
            <Welcome username={ username } warning={ warning } socket={ socket } usernameSubmitHandler={ openChatHandler } hidden={ !hideChat } />
            <Chat username={ username } socket={ socket } hidden={ hideChat } />
        </div>
    );
}

export default App;