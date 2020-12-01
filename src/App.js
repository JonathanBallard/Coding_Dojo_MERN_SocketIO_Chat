import React, { useState, useEffect, useRef } from 'react';
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
    // const [ username, setUsername ] = useState('');
    const [ warning, setWarning ] = useState('');

    let nameIn = useRef(null);

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
            // setUsername(name);
            nameIn.current = name;
        });
        
        socket.on('toastSuccess', (name) => {
            setHideChat(false);
            // setUsername(name);
            nameIn.current = name;
        });

        socket.on('loggedOut', () => {
            setHideChat(true);
        });

        return socket.emit('freeUpName', nameIn.current);


    }, []);

    const sendToast = (name) => {
        //emit name for the server to toast
        socket.emit('toastOut', { sender: name });
    }

    const openChatHandler = (uname) => {
        //toast username
        nameIn.current = uname;
        console.log('activated openChatHandler in App.js with name: ' + nameIn.current)
        socket.emit('logClientData', 'App.js:62', nameIn.current);
        sendToast(uname);
    }




    return (
        <div className="App">
            <Header />
            <Welcome username={ nameIn.current } warning={ warning } socket={ socket } usernameSubmitHandler={ openChatHandler } hidden={ !hideChat } />
            <Chat username={ nameIn.current } socket={ socket } hidden={ hideChat } />
        </div>
    );
}

export default App;