import React, { useState, useEffect } from 'react';
import './welcome.css';

const Welcome = props => {


    return (
        <div className='welcome'>
            <h4>Get started right now!</h4>
            <h6>I want to start chatting with the name...</h6>
            <form action="/name">
                <input name="username" type="text" placeholder="My name..." />
                <input className="submitBtn" type="submit" value="Start Chatting"/>
            </form>
        </div>
    )
}


export default Welcome;


