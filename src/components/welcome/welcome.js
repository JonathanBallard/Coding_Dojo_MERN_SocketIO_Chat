import React, { useState, useEffect } from 'react';
import './welcome.css';


const Welcome = props => {
    

    // useEffect( () => {
    //     const io = require('socket.io-client');
    //     const socket = io('http://localhost:8000');
    // }, [])

    const sendToast = (name) => {
        const io = require('socket.io-client');
        const socket = io('http://localhost:8000');
        socket.emit('toast', name);
    }

    let [ username, setUsername ] = useState('anonymous');

    const [welcomeStyling, setWelcomeStyling] = useState('welcome');

    const setName = (name) => {
        setUsername(name);
    }

    const openChat = () => {
        sendToast(username);
        console.log('hide welcome, open chat')
        let newClasses = [...welcomeStyling, 'hidden'];
        newClasses.join(' ');
        setWelcomeStyling(newClasses);
    }

    return (
        <div className={welcomeStyling}>
            <h4>Get started right now!</h4>
            <h6>I want to start chatting with the name...</h6>
            <form>
                <input onChange={ setName } name="username" type="text" placeholder={ username } />
                <input onClick={ openChat } className="submitBtn" type="submit" value="Start Chatting"/>
            </form>
        </div>
    )
}



export default Welcome;


