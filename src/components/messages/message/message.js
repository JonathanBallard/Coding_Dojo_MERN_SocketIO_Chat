import React from 'react';
import './message.css'

const Message = props => {


    if(props.align !== 'alignRight'){
        return (
            <div className="message alignLeft">
                <h4>{ props.index }</h4>
                <p className="msgContent" >{ props.content }</p>
                <p className="msgMetadata">sent by: { props.sender } at { props.timesent }</p>
            </div>
        )
    }
    else {
        return (
            <div className="message alignRight">
                <h4>{ props.index }</h4>
                <p className="msgContent" >{ props.content }</p>
                <p className="msgMetadata">sent by: { props.sender } at { props.timesent }</p>
            </div>
        )
    }
}

export default Message;