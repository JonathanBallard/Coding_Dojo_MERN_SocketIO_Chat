import React from 'react';
import './toast.css';

const Toast = (props) => {

    if(props.user){
        return (
            <div className="toast">
                <p className='toastBody'><span className='me'>{ props.sender }</span> { props.content } at { props.timesent }</p>
            </div>
        )
    }
    else{
        return (
            <div className="toast">
                <p className='toastBody'><span className='sender'>{ props.sender }</span> { props.content } at { props.timesent }</p>
            </div>
        )
    }
}


export default Toast;