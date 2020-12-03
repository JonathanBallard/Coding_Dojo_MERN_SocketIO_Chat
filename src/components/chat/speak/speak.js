import React, { useState, useEffect, useRef } from 'react';
import './speak.css';

const Speak = props => {

    const [messageToSend, setMessageToSend] = useState();
    const [timeToRender, setTimeToRender] = useState(false);
    const serverMessage = useRef(<p className='serverMessage hidden'>Your message does not meet our minimum length requirement!</p>);

    const updateMessageHandler = (e) => {
        setMessageToSend(e.target.value);
    }
    //add our messageToSend to go through io.emit or similar
    const sendMessageHandler = (e) => {
        // console.log('message sending from speak: ' + messageToSend);

        if(messageToSend){
            props.socket.emit('outgoing_message', messageToSend, props.username);
            const input = document.getElementById('inputBox');
            input.value = '';
            setMessageToSend('');
            serverMessage.current = <p className='serverMessage hidden'>Your message does not meet our minimum length requirement!</p>;
            setTimeToRender(!timeToRender);
        }
        else {
            serverMessage.current = <p className='serverMessage'>Your message does not meet our minimum length requirement!</p>;
            setTimeToRender(!timeToRender);
        }
        e.preventDefault();
    }



    
    return (
        <div className='speak'>
            <h4>Enter Message:</h4>
            <p className='hidden'>{ timeToRender }</p>
            { serverMessage.current }
            <form>
                <input onChange= { updateMessageHandler } id='inputBox' name='sendMsg' type='text' placeholder='My Message...' />
                <input className='submitBtn' onClick={ sendMessageHandler } type="submit" value="Send"/>
            </form>



        </div>
    )
}


export default Speak;