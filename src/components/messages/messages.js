import React, { useEffect, useState, useRef } from 'react';

import Message from "./message/message";
import Toast from './toast/toast';
import './messages.css'

const Messages = props => {

    // const [ messageArr, setMessageArr ] = useState([]);
    const [ allMessages, setAllMessages ] = useState([]);

    const chatBox = document.getElementById('chatBox'); 
    if(chatBox){
        var xH = chatBox.scrollHeight; 
        chatBox.scrollTo(0, xH);
        chatBox.scrollBy(0,700);
    }

    // const messageRef = useRef([]);

    let listOfMessages = useRef([]);

    const createMessage= (type, msg, sender, len, date) =>{

        if(type !== 'toast' && type !== 'message' && type !== 'toastMe'){
            return;
        }

        const timeString = date;
        const currentArrLength = len;

        

        let newMsg = <Message socket={ props.socket } align='alignRight' index={ currentArrLength } key={ currentArrLength } sender={ sender } timesent={ timeString } content={ msg } />;

        // add logic to check if type is a toast or a message
        if(type === 'message'){

            if(props.username !== sender){
                newMsg = <Message socket={ props.socket } align='alignLeft' index={ currentArrLength } key={ currentArrLength } sender={ sender } timesent={ timeString } content={ msg } />;
            }
            else {
                newMsg = <Message socket={ props.socket } align='alignRight' index={ currentArrLength } key={ currentArrLength } sender={ sender } timesent={ timeString } content={ msg } />;
            }

        }
        else if(type === 'toast'){
            // add in some logic checking if this message was sent by our user (to change background color)
            if(props.username === sender){
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
        let updatedMessages = [];
        console.log('arr.length in updateMessages: ' +  arr.length)
        arr.forEach(msg => {
            console.log('CREATING MESSAGE: ' + msg.message + ' ' + msg.sender + ' ' + msg.date);
            const incMsg = createMessage(msg.type, msg.message, msg.sender, updatedMessages.length, msg.date);
            updatedMessages.push(incMsg);
        });
        
        return updatedMessages;
    }


    useEffect(() => {
        props.socket.on('all_messages_from_server', (arr) => {
            setAllMessages([...arr]);
        })

        //keep scrolled to bottom of chat
        // const chatBox = document.getElementById('chatBox');
        // if(chatBox){
        //     var xH = chatBox.scrollHeight; 
        //     chatBox.scrollTo(0, xH);
        // }
    }, []);

    listOfMessages.current = updateMessages(allMessages);

    
    
    //keep scrolled to bottom of chat
    

    // listOfMessages.current = updateMessages(messageArr);
    // listOfMessages.current = updateMessages(allMessages);

    return (
        <div id="chatBox" className='allMessages'>
            <ul>
                { listOfMessages.current }
            </ul>
            {/* <h5> Messages: { messageArr.length }</h5> */}
        </div>
    )
}

export default Messages;