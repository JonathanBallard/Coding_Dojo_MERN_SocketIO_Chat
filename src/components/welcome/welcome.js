import React, { useState, useEffect } from 'react';
import './welcome.css';


const Welcome = props => {

    const [ username, setUsername ] = useState("");

    const [ welcomeStyling, setWelcomeStyling ] = useState("");



    useEffect(() => {
        if(props.hidden){
            setWelcomeStyling('welcome hidden');
        }
        else {
            setWelcomeStyling('welcome');
        }
    }, [props.hidden])

    const setName = (e) => {
        setUsername(e.target.value);
        console.log('welcome setUsername: ' + username);
    }
    const sendUsername = () => {
        props.usernameSubmitHandler(username);
    }

    return (
        <div className={welcomeStyling}>
            <h4>Get started right now!</h4>
            <h6>I want to start chatting with the name...</h6>
            <form action=''>
                <input id='name' onChange={ setName } name="username" type="text" placeholder={ username } />
                <input onClick={ sendUsername } className="submitBtn" type="submit" value="Start Chatting"/>
            </form>

        </div>
    )
}



export default Welcome;


