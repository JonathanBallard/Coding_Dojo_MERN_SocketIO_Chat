
const express = require('express');
const app = express();
const port = 8000;

//initializes express server to listen on port 8000 and send a message as soon as the server is ready
const server = app.listen(8000, () => {
    console.log('The Server is all fired up on port 8000')
});

const io = require("socket.io")(server);


//On every client connection it logs the socket ID
//Then emits 2 checks (which we haven't seen on our clients yet)
//When the client sends data in, we send that data to all other clients
io.on('connection', socket => {
    console.log('Nice to meet you: Socket ID:', socket.id, ' **handshake**');
    io.emit('check 123');
    socket.emit('check 456');
    console.log('emits done')
    socket.on('event_from_client', data => {
        socket.broadcast.emit("send_data_to_all_other_clients", data);
    });
});





