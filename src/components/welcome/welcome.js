import React, { useState, useEffect } from 'react';
import './welcome.css';


const Welcome = props => {
    

    // useEffect( () => {
    //     const io = require('socket.io-client');
    //     const socket = io('http://localhost:8000');
    // }, [])



    const [ username, setUsername ] = useState("");
    const [ toast, setToast ] = useState("");
    const [ welcomeStyling, setWelcomeStyling ] = useState("");

    useEffect(() => {
        setUsername('anonymous');
        setWelcomeStyling('welcome');
        props.socket.on('toast', data => {
            setToast(data);
        })
    }, [])


    useEffect(() => {
        if(props.hidden){
            setWelcomeStyling('welcome hidden');
        }
        else {
            setWelcomeStyling('welcome');
        }
    }, [props.hidden])

    const setName = (name) => {
        setUsername(name);
    }
    const sendUsername = () => {
        props.usernameSubmitHandler(username);
    }

    return (
        <div className={welcomeStyling}>
            <h4>Get started right now!</h4>
            <h6>I want to start chatting with the name...</h6>
            <form action=''>
                <input onChange={ setName } name="username" type="text" placeholder={ username } />
                <input onClick={ sendUsername } className="submitBtn" type="submit" value="Start Chatting"/>
            </form>
            <h2>{ toast }</h2>
        </div>
    )
}



export default Welcome;


