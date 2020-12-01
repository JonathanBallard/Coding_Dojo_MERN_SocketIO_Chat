import React from 'react';
import './message.css'

const Message = props => {


    if(props.align !== 'alignRight'){
        return (
            <li className='chatItem'>
                <div className="message alignLeft userNotSender">
                    {/* <h4>{ props.index }</h4> */}
                    <p className="msgContent" >{ props.content }</p>
                    <p className="msgMetadata">sent by: <span className='senderName'>{ props.sender }</span> at { props.timesent }</p>
                </div>
            </li>
        )
    }
    else {
        return (
            <li className='chatItem'>
                <div className="message alignRight userSender">
                    {/* <h4>{ props.index }</h4> */}
                    <p className="msgContent" >{ props.content }</p>
                    <p className="msgMetadata">sent by: <span className='senderName'>{ props.sender }</span> at { props.timesent }</p>
                </div>
            </li>
        )
    }
}

export default Message;