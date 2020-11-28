
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



//On every client connection it logs the socket ID
//Then emits 2 checks (which we haven't seen on our clients yet)
//When the client sends data in, we send that data to all other clients
io.on('connection', socket => {
    let allMessages = [];

    console.log('Nice to meet you: Socket ID:', socket.id, ' **handshake**');
    // socket.emit("Welcome", 'testing')

    socket.on('toastOut', (sender) => {
        const d = new Date();
        const currHours = d.getHours();
        const currMinutes = d.getMinutes();
        const currSeconds = d.getSeconds();
        const timeString = '' + currHours + ':' + currMinutes + ':' + currSeconds; 

        socket.broadcast.emit("toast", 'has joined the chat!', sender, timeString);
        socket.emit("toastMe", 'have joined the chat!', 'You', timeString);
        //send out all previous messages here
        socket.emit('prev_messages', allMessages);
        allMessages.push({ type: 'toast', msg: 'has joined the chat!', sender: sender, date: timeString });
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
    

    socket.on("disconnect", () => {
        console.log('Client Disconnected');
    })

});





