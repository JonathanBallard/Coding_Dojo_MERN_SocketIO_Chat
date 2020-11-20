import React from 'react';
import './message.css'

const Message = props => {


    if(props.align != 'alignRight'){

        return (
            <div className="message alignLeft">
                <p className="msgContent" >{ props.content }</p>
                <p className="msgMetadata">sent by: { props.sender } at { props.timesent }</p>
            </div>
        )
    }
    else {
        return (
            <div className="message alignRight">
                <p className="msgContent" >{ props.content }</p>
                <p className="msgMetadata">sent by: { props.sender } at { props.timesent }</p>
            </div>
        )
    }
}

export default Message;