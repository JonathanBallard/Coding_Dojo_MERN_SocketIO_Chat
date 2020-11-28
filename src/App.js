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

    useEffect(() => {
        setHideChat(true);
        setUsername('');

        // we need to set up all of our event listeners
        // in the useEffect callback function
        console.log('Is this running?');
        socket.on('Welcome', data => console.log(data));

        // note that we're returning a callback function
        // this ensures that the underlying socket will be closed if App is unmounted
        // this would be more critical if we were creating the socket in a subcomponent
        // return () => socket.disconnect(true);
        // setUsername(username);
    }, []);

    const sendToast = (name) => {
        //emit name for the server to toast
        socket.emit('toastOut', name);
    }

    const openChatHandler = (uname) => {
        setHideChat(false);
        //toast username
        console.log('activated openChatHandler in App.js with name: ' + uname)
        sendToast(uname);
        setUsername(uname);
    }



    // return (
    //     <div className="App">
    //         <Header />
    //         <Welcome socket={ socket } usernameSubmitHandler={ openChatHandler } hidden={ false } />
    //         <Chat username={ username } socket={ socket } hidden={ false } />
    //     </div>
    // );
    //testing
    return (
        <div className="App">
            <Header />
            <Welcome socket={ socket } usernameSubmitHandler={ openChatHandler } hidden={ !hideChat } />
            <Chat username={ username } socket={ socket } hidden={ hideChat } />
        </div>
    );
}

export default App;