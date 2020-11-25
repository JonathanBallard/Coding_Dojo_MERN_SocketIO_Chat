import React, {useState, useEffect} from 'react';
import './toast.css';

const Toast = (props) => {

    return (
        <div className="toast">
            <p className='toastBody'><span className='sender'>{ props.sender }</span> { props.content } at { props.timesent }</p>
        </div>
    )
}


export default Toast;