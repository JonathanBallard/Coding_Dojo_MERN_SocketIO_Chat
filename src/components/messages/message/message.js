import React from 'react';
import './message.css'

const Message = props => {

    return (
        <div className="message">
            <p className="msgContent" >{ props.content }</p>
            <p className="msgMetadata">sent by: { props.sender } at { props.timesent }</p>
        </div>
    )
}

export default Message;