import React, { useState } from 'react';
import './speak.css';

const Speak = props => {

    const [messageToSend, setMessageToSend] = useState();

    const updateMessageHandler = (e) => {
        setMessageToSend(e.target.value);
    }

    //add our messageToSend to go through io.emit or similar
    const sendMessageHandler = (e) => {
        // console.log('message sending from speak: ' + messageToSend);
        props.socket.emit('outgoing_message', messageToSend, props.username);
        e.preventDefault();
        const input = document.getElementById('inputBox');
        input.value = '';
    }
    
    return (
        <div className='speak'>
            <h4>Enter Message:</h4>
            <form>
                <input onChange= { updateMessageHandler } id='inputBox' name='sendMsg' type='text' placeholder='My Message...' />
                <input className='submitBtn' onClick={ sendMessageHandler } type="submit" value="Send"/>
            </form>

        </div>
    )
}


export default Speak;