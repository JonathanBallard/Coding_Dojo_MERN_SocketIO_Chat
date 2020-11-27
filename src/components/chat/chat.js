import React, {useState, useEffect} from 'react';

import Messages from '../messages/messages';
import Speak from './speak/speak';
import './chat.css'

const Chat = props => {
    

    const [chatClasses, setChatClasses] = useState('chat hidden');
    const [ username, setUsername ] = useState();

    useEffect(() =>{
        if(props.hidden !== true){
            setChatClasses('chat');
        }
        else {
            setChatClasses('chat hidden')
        }

        if(props.username){
            setUsername(props.username);
        }
    },[props.hidden, props.username]);



    return (
        <div className={ chatClasses }>
            <h1>Chatting As: <span id="username">{ username }</span></h1>
            <Messages username={ props.username } socket={ props.socket } />
            <Speak username={ props.username } socket={ props.socket } />
        </div>
    )
}

export default Chat;