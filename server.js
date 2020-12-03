
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
        this.id = id;
        this.name = name;
    }
};

let allSockets = [];
let allUsernames = [];
let allMessages = [];

//On every client connection it logs the socket ID
//Then emits 2 checks (which we haven't seen on our clients yet)
//When the client sends data in, we send that data to all other clients
io.on('connection', socket => {
    // const socketId = socket.id;
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
            socket.emit('toastFail', data.sender, 'is an inappropriate name, please be respectful');
        }

        //check reserved names
        else if(reservedNames.includes(data.sender)){
            socket.emit('toastFail', data.sender, 'is a reserved name, please enter a new name');
        }

        //check usernames currently in use
        else if(allUsernames.includes(data.sender)){
            socket.emit('toastFail', data.sender, 'is already in use, please enter a new name')
        }

        else {
            //if all checks pass then toast

            //add approved name to array of all names
            allUsernames.push(data.sender);
            
            //add socket/name combo to allSockets
            const newSocket = new socketName(socket.id, data.sender);
            allSockets.push(newSocket);

            socket.emit('toastSuccess', data.sender);

            // io.emit("toast", 'joined the chat!', data.sender, timeString);
            // socket.emit("toastMe", 'joined the chat!', 'You', timeString);
            
            allMessages.push({ type: 'toast', message: 'joined the chat!', sender: data.sender, date: timeString });

            
            io.emit("all_messages_from_server", allMessages);
        }

    });

    socket.on('outgoing_message', (msg, sender) => {

        if(msg){
            const d = new Date();
            const currHours = d.getHours();
            const currMinutes = d.getMinutes();
            const currSeconds = d.getSeconds();
            const timeString = '' + currHours + ':' + currMinutes + ':' + currSeconds; 
            
            allMessages.push({ type: 'message', message: msg, sender: sender, date:timeString });
            // io.emit("new_message_from_server", msg, sender, timeString);
            io.emit("all_messages_from_server", allMessages);
            socket.emit('clear_server_message');
        }
        else {
            socket.emit('failed_message', 'Your message did not meet our minimum length requirement!');
        }
    });

    socket.on('logClientData', (origin, data) => {
        console.log('LOGGING DATA FROM: ' + origin);
        console.log('--------------------------');
        console.log(data);
        console.log('==========================');
    });

    socket.on("logout", (username) => {
        // console.log('logout request: ' + username);
        const oldSocket = {...socket};
        const oldSocketId = oldSocket.id;
        freeUpName(username, oldSocketId);
        socket.emit('loggedOut');
        socket.disconnect(true);
    });

    socket.on("freeUpName", (name) => {
        const oldSocket = {...socket};
        const oldSocketId = oldSocket.id;
        freeUpName(name, oldSocketId);
    });

    socket.on('disconnecting', () => {
        return true;
    });
    
    socket.on('disconnect', (data) => {
        //find and remove name
        const oldSocket = {...socket};
        const oldSocketId = oldSocket.id;
        freeUpName('unusedName', oldSocketId);
        console.log('FIRED DISCONNECT EVENT');
    });
    



    const freeUpName = (nameIn, socketToFreeId) => {
        // Remove name from allUsernames by name
        // for(let i in allUsernames){
        //     if(allUsernames[i] === nameIn){
        //         allUsernames.splice(i,1);
        //     }
        // }

        // Remove name from allUsernames by socket.id
        for(let t of allSockets){
            if(t.id === socketToFreeId){
                for(let q in allUsernames){
                    if(allUsernames[q] === t.name){
                        allUsernames.splice(q,1);
                    }
                }
            }
        }

    }

});





