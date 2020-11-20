import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Message from "./message/message";
import './messages.css'

const Messages = props => {

    const [socket] = useState(() => io(':8000'));
    
    const [messages, setMessages] = useState([]);
    
    useEffect(() => {
        socket.on("new_message_from_server", msg => 
        setMessages(prevMessages => {
            return [msg, ...prevMessages];
        })
        );
    }, [socket]);


    const messageArr = [];

    //normal messages
    for(var i in messages){
        const d = new Date();
        const currHours = d.getHours();
        const currMinutes = d.getMinutes();
        const currSeconds = d.getSeconds();
        const timeString = '' + currHours + ':' + currMinutes + ':' + currSeconds; 

        messageArr.push(<Message key={ i } sender='' timesent={ timeString } content={ messages[i] } ></Message>)
    }

    //test messages
    messageArr.push(<Message key='5' sender='jonathan' timesent='12:26:04' content="Hello Chat" />);
    messageArr.push(<Message key='6' sender='jonathan' timesent='12:27:44' content="Message 2" />);
    messageArr.push(<Message key='7' sender='jonathan' timesent='12:22:54' content="Am I alone?" />);

    return (
        <div className='allMessages'>
            { messageArr }
        </div>
    )
}

export default Messages;