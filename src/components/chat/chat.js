import React, {useState, useEffect} from 'react';

import Messages from '../messages/messages';
import Speak from './speak/speak';
import './chat.css'

const Chat = props => {
    

    let [chatClasses, setChatClasses] = useState('chat hidden');

    useEffect(() =>{
        if(props.hidden !== true){
            setChatClasses('chat');
        }
        else {
            setChatClasses('chat hidden')
        }
    },[props.hidden])

    return (
        <div className={ chatClasses }>
            <Messages socket={ props.socket } />
            <Speak socket={ props.socket } />
        </div>
    )
}

export default Chat;