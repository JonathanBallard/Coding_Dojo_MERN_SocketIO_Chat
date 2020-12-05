import React from 'react';
import './toast.css';

const Toast = (props) => {

    if(props.user){
        return (
            <li className="chatItem">
                <div className='toast'>
                    <p className='toastBody'><span className='me'>{ props.sender }</span> <span className='metadata'>{ props.content } at { props.timesent }</span></p>
                </div>
            </li>
        )
    }
    else{
        return (
            <li className="chatItem">
                <div className='toast'>
                    <p className='toastBody'><span className='sender'>{ props.sender }</span> <span className='metadata'>{ props.content } at { props.timesent }</span></p>
                </div>
            </li>
        )
    }
}


export default Toast;