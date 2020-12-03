
import React, { useState, useEffect, useRef } from 'react';
import './welcome.css';


const Welcome = props => {

    const [ username, setUsername ] = useState("");

    const [ welcomeStyling, setWelcomeStyling ] = useState("");

    const [ warningClasses, setWarningClasses ] = useState('');

    const [timeToRender, setTimeToRender] = useState(false);
    const serverMessage = useRef(<p className='serverMessage hidden'>Your username does not meet our minimum length requirement!</p>);

    let nameOut = useRef(null);

    useEffect(() => {

        if(props.warning.length){
            setWarningClasses('warning');
        }
        else{
            setWarningClasses('warning hidden');
        }
        
        if(props.hidden){
            setWelcomeStyling('welcome hidden');
        }
        else {
            setWelcomeStyling('welcome');
        }
    }, [props.hidden, props.warning])

    const setName = (e) => {
        setUsername(e.target.value);
        nameOut.current = e.target.value;
        console.log('welcome setUsername: ' + username);
        
    }
    const sendUsername = (e) => {
        if(nameOut.current && nameOut.current.length > 2){
            serverMessage.current = <p className='serverMessage hidden'>Your username does not meet our minimum length requirement!</p>;
            props.usernameSubmitHandler(nameOut.current);
            const input = document.getElementById('inputName');
            input.value = '';
        }
        else {
            serverMessage.current = <p className='serverMessage'>Your username does not meet our minimum length requirement!</p>;
            setTimeToRender(!timeToRender);
        }
        e.preventDefault();
    }

    return (
        <div className={welcomeStyling}>
            <h4>Get started right now!</h4>
            { serverMessage.current }
            <h3 className={ warningClasses }>I'm sorry, <span className="username">"{ props.username }"</span> { props.warning }</h3>
            <h6>I want to start chatting with the name...</h6>
            <form action=''>
                <input id='inputName' onChange={ setName } name="username" type="text" placeholder={ 'username' } />
                <input onClick={ sendUsername } className="submitBtn" type="submit" value="Start Chatting"/>
            </form>

        </div>
    )
}



export default Welcome;


