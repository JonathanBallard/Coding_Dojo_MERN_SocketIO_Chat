import React, { useState, useEffect } from 'react';
import './welcome.css';

const Welcome = props => {

    let [ username, setUsername ] = useState('anonymous');

    const [welcomeStyling, setWelcomeStyling] = useState('welcome');

    const setName = (name) => {
        setUsername(name);
    }

    const openChat = () => {
        console.log('hide welcome, open chat')
        let newClasses = [...welcomeStyling, 'hidden'];
        newClasses.join(' ');
        setWelcomeStyling(newClasses);
    }

    return (
        <div className={welcomeStyling}>
            <h4>Get started right now!</h4>
            <h6>I want to start chatting with the name...</h6>
            <form>
                <input onChange={ setName } name="username" type="text" placeholder={ username } />
                <input onClick={ openChat } className="submitBtn" type="submit" value="Start Chatting"/>
            </form>
        </div>
    )
}



export default Welcome;


