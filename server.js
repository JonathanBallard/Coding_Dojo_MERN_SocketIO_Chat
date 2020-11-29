
const express = require('express');
const app = express();
const port = 8000;

app.use( express.json());
app.use( express.urlencoded({ extended: true }) );


//initializes express server to listen on port 8000 and send a message as soon as the server is ready
const server = app.listen(port, () => {
    console.log('The Server is all fired up on port 8000')
});

const io = require("socket.io")(server);

class socketName {
    constructor(id, name){
        this.socketID = id;
        this.name = name;
    }
};

let allUsernames = [];
let allSockets = [];

//On every client connection it logs the socket ID
//Then emits 2 checks (which we haven't seen on our clients yet)
//When the client sends data in, we send that data to all other clients
io.on('connection', socket => {
    let allMessages = [];
    let rudeWords = ['fuck']; //eventually attach an array of inappropriate words here incl. swear words and suchlike
    let reservedNames = ['Jonathan', 'jonathan', 'Admin', 'admin', 'You', 'you', 'Moderator', 'moderator', 'Room', 'room', 'Test', 'test'];


    console.log('Nice to meet you: Socket ID:', socket.id, ' **handshake**');
    // socket.emit("Welcome", 'testing')

    socket.on('toastOut', (sender) => {
        const d = new Date();
        const currHours = d.getHours();
        const currMinutes = d.getMinutes();
        const currSeconds = d.getSeconds();
        const timeString = '' + currHours + ':' + currMinutes + ':' + currSeconds;

        // do logic to determine if username is valid, if NOT valid then return client to welcome screen with warning message

        //check rudeWords
        if(rudeWords.includes(sender)){
            // return user to Welcome screen for new name with a warning
            socket.emit('toastFail', sender, 'is an inappropriate name, please be respectful');
        }

        //check reserved names
        else if(reservedNames.includes(sender)){
            // return user to Welcome screen for new name with a warning
            socket.emit('toastFail', sender, 'is a reserved name, please enter a new name');
        }

        //check usernames currently in use
        else if(allUsernames.includes(sender)){
            // return user to Welcome screen for new name with a warning
            socket.emit('toastFail', sender, 'is already in use, please enter a new name')
        }
        else {
            //if all checks pass then toast
            allUsernames.push(sender);
            let newSocket = new socketName(socket.id, sender);
            // console.log('sender:::' + newSocket.socketID)
            allSockets.push(newSocket)
            socket.emit('toastSuccess', sender);
            socket.broadcast.emit("toast", 'has joined the chat!', sender, timeString);
            socket.emit("toastMe", 'have joined the chat!', 'You', timeString);
            //send out all previous messages here
            socket.emit('prev_messages', allMessages);
            allMessages.push({ type: 'toast', msg: 'has joined the chat!', sender: sender, date: timeString });
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
    })
    

    socket.on("freeUpName", () => {
        console.log('allSockets length ' + allSockets.length)
        const id = socket.id;
        var sender = '';
        
        for(let i in allSockets){
            if(allSockets[i].socketID === id){
                sender = allSockets[i].name;
            }
        }
        console.log('sender: ' + sender);
        console.log('allUsernames: ' + allUsernames );
        //delete username so it's freed back up for use
        for(let i in allUsernames){
            console.log('sender index? ' + allUsernames[i]);
            if(allUsernames[i] === sender){
                allUsernames.splice(i);
            }
            else if(allUsernames.length === 1){
                allUsernames.splice(0);
            }
        }
        
        console.log('Client Disconnected');
        // socket.emit('disconnect');
        console.log('AFTER DISCONNECT - allUsernames: ' + allUsernames );
    })

    socket.on('disconnect', () => {
        socket.disconnect(true);
    });

});





