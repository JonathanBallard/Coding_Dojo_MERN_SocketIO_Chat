import React, { useEffect, useState } from 'react';

import Message from "./message/message";
import Toast from './toast/toast';
import './messages.css'

const Messages = props => {
    
    const [messageArr, setMessageArr] = useState([]);


    const createMessage= (type, msg, sender) =>{
        console.time('createMessage');
        const d = new Date();
        const currHours = d.getHours();
        const currMinutes = d.getMinutes();
        const currSeconds = d.getSeconds();
        const timeString = '' + currHours + ':' + currMinutes + ':' + currSeconds; 

        const currentArrLength = messageArr.length;
        
        // add in some logic checking if this message was sent by our user (to change background color)
        
        let newMsg = <Message socket={ props.socket } align='alignRight' index={ currentArrLength } key={ currentArrLength } sender={ sender } timesent={ timeString } content={ msg } />;
        
        // add logic to check if message is a toast or not
        if(type === 'message'){
            console.log('messages, props.username: ' + props.username + ' , sender: ' + sender);

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
        console.timeEnd('createMessage');
        console.time('setMessageArrTimer');
        setMessageArr([...messageArr, newMsg]);
        console.timeEnd('setMessageArrTimer');
    };
    
    useEffect(() => {

        //receive toasted name
        props.socket.on('toast', (msg, sender) => {
            createMessage('toast', msg, sender)
        });
        
        props.socket.on("new_message_from_server", (msg, sender) => {
            createMessage('message', msg, sender);
        });

    });


    return (
        <div className='allMessages'>
            { messageArr }
            {/* <h5> Messages: { messageArr.length }</h5> */}
        </div>
    )
}

export default Messages;