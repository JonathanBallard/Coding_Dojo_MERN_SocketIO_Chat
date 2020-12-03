import React, { useEffect, useState } from 'react';

import Message from "./message/message";
import Toast from './toast/toast';
import './messages.css'

const Messages = props => {

    const [messageArr, setMessageArr] = useState([]);
    const [allMessages, setAllMessages] = useState([]);

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

            if(props.username !== sender){
                newMsg = <Message socket={ props.socket } align='alignLeft' index={ currentArrLength } key={ currentArrLength } sender={ sender } timesent={ timeString } content={ msg } />;
            }
            else {
                newMsg = <Message socket={ props.socket } align='alignRight' index={ currentArrLength } key={ currentArrLength } sender={ sender } timesent={ timeString } content={ msg } />;
            }

        }
        else if(type === 'toast'){
            if(sender === 'you'){
                newMsg = <Toast user='true' socket={ props.socket } index={ currentArrLength } key={ currentArrLength } sender={ sender } timesent={ timeString } content={ msg } />;
            }
            else {
                newMsg = <Toast socket={ props.socket } index={ currentArrLength } key={ currentArrLength } sender={ sender } timesent={ timeString } content={ msg } />;
            }
        }
        // else if(type === 'toastMe'){
        //     newMsg = <Toast user='true' socket={ props.socket } index={ currentArrLength } key={ currentArrLength } sender={ sender } timesent={ timeString } content={ msg } />;
        // }


        return newMsg;
    };

    const updateMessages = (arr) => {
        let updatedMessages = []
        arr.forEach(msg => {
            // console.log('CREATING PREV. MESSAGE');
            // console.log(msg.message + ' ' + msg.sender);
            let incMsg = createMessage(msg.type, msg.message, msg.sender, updatedMessages.length, msg.date);
            updatedMessages.push(incMsg);
        });
        return updatedMessages;
    }

    useEffect(() => {
        //receive toasted name
        props.socket.on('toast', (msg, sender, date) => {
            // setMessageArr([...messageArr, {type: 'toast', message: msg, sender: sender, date: date}])
            // setAllMessages([...allMessages, {type: 'toast', message: msg, sender: sender, date: date}])
        });

        props.socket.on('toastMe', (msg, sender, date) => {
            // setMessageArr([...messageArr, {type: 'toastMe', message: msg, sender: sender, date: date}])
            // setAllMessages([...allMessages, {type: 'toastMe', message: msg, sender: 'you', date: date}])
        });

        props.socket.on('all_messages_from_server', (arr) => {
            setAllMessages([...arr]);
        })

        //keep scrolled to bottom of chat
        const chatBox = document.getElementById('chatBox'); 
        var xH = chatBox.scrollHeight; 
        chatBox.scrollTo(0, xH);

    }, [ allMessages, props.socket ]);

    // listOfMessages = updateMessages(messageArr);
    listOfMessages = updateMessages(allMessages);

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