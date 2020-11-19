import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';
import './chat.css'

const Chat = props => {
    
    const [socket] = useState(() => io(':8000'));
    
    const [messages, setMessages] = useState([]);
    
    useEffect(() => {
        socket.on("new_message_from_server", msg => 
        setMessages(prevMessages => {
            return [msg, ...prevMessages];
        })
        );
    }, [socket]);

    return (
        <>
            
            

        </>
    )
}

export default Chat;