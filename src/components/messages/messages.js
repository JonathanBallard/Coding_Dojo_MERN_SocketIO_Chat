import React, { useEffect, useState } from 'react';

import Message from "./message/message";
import Toast from './toast/toast';
import './messages.css'

const Messages = props => {
    
    const [messageArr, setMessageArr] = useState([]);

    // const messageRef = useRef([]);

    let listOfMessages = [];

    const createMessage= (type, msg, sender, len, date) =>{

        if(type !== 'toast' && type !== 'message' && type !== 'toastMe'){
            return;
        }

        const timeString = date;
        const currentArrLength = len;
        
        // add in some logic checking if this message was sent by our user (to change background color)
        
        let newMsg = <Message socket={ props.socket } align='alignRight' index={ currentArrLength } key={ currentArrLength } sender={ sender } timesent={ timeString } content={ msg } />;
        
        // add logic to check if message is a toast or not
        if(type === 'message'){
            // console.log('messages, props.username: ' + props.username + ' , sender: ' + sender);

            if(props.username !== sender){
                newMsg = <Message socket={ props.socket } align='alignLeft' index={ currentArrLength } key={ currentArrLength } sender={ sender } timesent={ timeString } content={ msg } />;
            }
            else {
                newMsg = <Message socket={ props.socket } align='alignRight' index={ currentArrLength } key={ currentArrLength } sender={ sender } timesent={ timeString } content={ msg } />;
            }

        }
        else if(type === 'toast'){
            newMsg = <Toast socket={ props.socket } index={ currentArrLength } key={ currentArrLength } sender={ sender } timesent={ timeString } content={ msg } />;
        }
        else if(type === 'toastMe'){
            newMsg = <Toast user='true' socket={ props.socket } index={ currentArrLength } key={ currentArrLength } sender={ sender } timesent={ timeString } content={ msg } />;
        }

        
        return newMsg;
    };

    const updateMessages = (arr) => {
        let allMessages = []

        arr.forEach(msg => {
            console.log('CREATING PREV. MESSAGE');
            console.log(msg.message + ' ' + msg.sender);
            let incMsg = createMessage(msg.type, msg.message, msg.sender, allMessages.length, msg.date);
            allMessages.push(incMsg);
        });
        return allMessages;
    }
    
    useEffect(() => {
        //receive toasted name
        props.socket.on('toast', (msg, sender, date) => {
            setMessageArr([...messageArr, {type: 'toast', message: msg, sender: sender, date: date}])
        });
        
        props.socket.on('toastMe', (msg, sender, date) => {
            setMessageArr([...messageArr, {type: 'toastMe', message: msg, sender: sender, date: date}])
        });
        
        props.socket.on('prev_messages', prevMessages => {
            let previous = updateMessages(prevMessages);
            setMessageArr([...previous, ...messageArr]);
        })
        
        props.socket.on("new_message_from_server", (msg, sender, date) => {
            setMessageArr([...messageArr, {type: 'message', message: msg, sender: sender, date: date}])
        });

        //keep scrolled to bottom of chat
        const chatBox = document.getElementById('chatBox'); 
        var xH = chatBox.scrollHeight; 
        chatBox.scrollTo(0, xH);

    }, [ messageArr ]);
    
    listOfMessages = updateMessages(messageArr);

    return (
        <div id="chatBox" className='allMessages'>
            <ul>
                { listOfMessages }
            </ul>
            {/* <h5> Messages: { messageArr.length }</h5> */}
        </div>
    )
}

export default Messages;