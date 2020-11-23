import React from 'react';

import Messages from '../messages/messages';
import Speak from './speak/speak';
import './chat.css'

const Chat = props => {
    


    return (
        <div className='chat'>
            <Messages />
            <Speak />
        </div>
    )
}

export default Chat;