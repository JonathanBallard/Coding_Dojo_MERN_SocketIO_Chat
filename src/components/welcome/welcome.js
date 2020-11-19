import React, { useEffect, useState } from 'react';

const Welcome = props => {

    return (
        <div className='welcome'>
            <h4>Get started right now!</h4>
            <h6>I want to start chatting with the name...</h6>
            <form action="/name">
                <input type="text" placeholder="My name..." />
                <input type="submit" value="Start Chatting"/>
            </form>
        </div>
    )
}


export default Welcome;


