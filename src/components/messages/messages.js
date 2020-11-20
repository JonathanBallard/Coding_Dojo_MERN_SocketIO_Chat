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

        // add in some logic here checking if this message is sent by the same user as the last message

        // add in some logic checking if this message was sent by our user (to change background color)

            messageArr.push(<Message key={ i } sender='' timesent={ timeString } content={ messages[i] } ></Message>)
    }

    //test messages
    messageArr.push(<Message key='5' align='alignLeft' sender='jonathan' timesent='12:26:04' content="Hello Chat" />);
    messageArr.push(<Message key='6' align='alignLeft' sender='jonathan' timesent='12:27:44' content="Message 2" />);
    messageArr.push(<Message key='7' align='alignRight' sender='Excalibur' timesent='12:22:54' content="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo." />);

    return (
        <div className='allMessages'>
            { messageArr }
        </div>
    )
}

export default Messages;