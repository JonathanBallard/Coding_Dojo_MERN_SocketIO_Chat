
const express = require('express');
const app = express();
const port = 8000;

app.use( express.json());
app.use( express.urlencoded({ extended: true }) );


//initializes express server to listen on port 8000 and send a message as soon as the server is ready
const server = app.listen(port, () => {
    console.log('The Server is all fired up on port 8000');
});

const io = require("socket.io")(server);

class socketName {
    constructor(id, name){
        this.socketID = id;
        this.name = name;
    }
};

let allUsernames = [];
let allMessages = [];

//On every client connection it logs the socket ID
//Then emits 2 checks (which we haven't seen on our clients yet)
//When the client sends data in, we send that data to all other clients
io.on('connection', socket => {
    const socketId = socket.id;
    let rudeWords = ['fuck']; //eventually attach an array of inappropriate words here incl. swear words and suchlike
    let reservedNames = ['Jonathan', 'jonathan', 'Admin', 'admin', 'You', 'you', 'Moderator', 'moderator', 'Room', 'room', 'Test', 'test'];

    console.log('Nice to meet you: Socket ID:', socket.id, ' **handshake**');

    socket.on('toastOut', (data) => {
        const d = new Date();
        const currHours = d.getHours();
        const currMinutes = d.getMinutes();
        const currSeconds = d.getSeconds();
        const timeString = '' + currHours + ':' + currMinutes + ':' + currSeconds;
        

        // do logic to determine if username is valid, if NOT valid then return client to welcome screen with warning message
        //check rudeWords
        if(rudeWords.includes(data.sender)){
            // return user to Welcome screen for new name with a warning
            socket.emit('toastFail', data.sender, 'is an inappropriate name, please be respectful');
        }

        //check reserved names
        else if(reservedNames.includes(data.sender)){
            // return user to Welcome screen for new name with a warning
            socket.emit('toastFail', data.sender, 'is a reserved name, please enter a new name');
        }

        //check usernames currently in use
        else if(allUsernames.includes(data.sender)){
            // return user to Welcome screen for new name with a warning
            socket.emit('toastFail', data.sender, 'is already in use, please enter a new name')
        }

        else {
            //if all checks pass then toast
            allUsernames.push(data.sender);

            socket.emit('toastSuccess', data.sender);

            socket.broadcast.emit("toast", 'has joined the chat!', data.sender, timeString);
            socket.emit("toastMe", 'have joined the chat!', 'You', timeString);
            
            //send out all previous messages here
            socket.emit('prev_messages', allMessages);
            allMessages.push({ type: 'toast', msg: 'has joined the chat!', sender: data.sender, date: timeString });
        }

    });

    socket.on('outgoing_message', (msg, sender) => {
        const d = new Date();
        const currHours = d.getHours();
        const currMinutes = d.getMinutes();
        const currSeconds = d.getSeconds();
        const timeString = '' + currHours + ':' + currMinutes + ':' + currSeconds; 

        allMessages.push({ type: 'message', msg: msg, sender: sender, date:timeString });
        io.emit("new_message_from_server", msg, sender, timeString);
    });

    socket.on('logClientData', (origin, data) => {
        console.log('LOGGING DATA FROM: ' + origin);
        console.log('--------------------------');
        console.log(data);
        console.log('==========================');
    });

    socket.on("logout", (username) => {
        console.log('logout request: ' + username);
        freeUpName(username);
        socket.emit('loggedOut');
        socket.disconnect(true);
    })

    socket.on('disconnecting', () => {
        return true;
    })
    
    socket.on('disconnect', () => {
        console.log('Client Disconnected');
        console.log('AFTER DISCONNECT - allUsernames: ' + allUsernames );
    })
    

    const freeUpName = (name) => {
        console.log('freeUpName has been called with name: ' + name);
        for(let i in allUsernames){
            // console.log('sender index? ' + allUsernames[i]);
            // console.log(i);
            // console.log(allUsernames[i] + name);
            // console.log(allUsernames[i] === name);
            if(allUsernames[i] === name){
                allUsernames.splice(i,1);
                console.log('********************')
                console.log('SUCCESSFULLY SPLICED')
                console.log('********************')
                console.log('remaining names: ' + allUsernames);
            }
        }
        
    }

    socket.on("freeUpName", (name) => {
        freeUpName(name);
    });

});





