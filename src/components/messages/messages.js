import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Message from "./message/message";
import Toast from './toast/toast';
import './messages.css'

const Messages = props => {
    
    const [messages, setMessages] = useState([]);
    const [messageArr, setMessageArr] = useState([]);
    const [ toastName, setToastName ] = useState();


    const createMessage= (type, msg, sender) =>{
        const d = new Date();
        const currHours = d.getHours();
        const currMinutes = d.getMinutes();
        const currSeconds = d.getSeconds();
        const timeString = '' + currHours + ':' + currMinutes + ':' + currSeconds; 

        // add in some logic here checking if this message is sent by the same user as the last message

        // add in some logic checking if this message was sent by our user (to change background color)
        
        // add logic to check if message is a toast or not

        if(type === 'message'){
            setMessageArr(...messageArr, <Message socket={ props.socket } key={ messageArr.length } sender={ sender } timesent={ timeString } content={ msg } />)
        }
        else if(type === 'toast'){
            setMessageArr(...messageArr, <Toast socket={ props.socket } key={ messageArr.length } sender={ sender } timesent={ timeString } content={ msg } />)
        }
    };
    
    useEffect(() => {

        //receive toasted name
        props.socket.on('toast', (msg, sender) => {
            setToastName(sender);
            console.log('toast name received on messages: ' + sender);
            createMessage('toast', msg, sender)
        });

        props.socket.on("new_message_from_server", (msg, sender) => {
            setMessages(prevMessages => {
                return [msg, ...prevMessages];
            })

            createMessage('message', msg, sender);
        });
        
    }, []);


    //test messages
    // messageArr.push(<Message key={ (messageArr.length) } align='alignLeft' sender='jonathan' timesent='12:26:04' content="Hello Chat" />);
    // messageArr.push(<Message key={ (messageArr.length) } align='alignLeft' sender='jonathan' timesent='12:27:44' content="Message 2" />);
    // messageArr.push(<Message key={ (messageArr.length) } align='alignRight' sender='Excalibur' timesent='12:22:54' content="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo." />);

    return (
        <div className='allMessages'>
            { messageArr }
        </div>
    )
}

export default Messages;