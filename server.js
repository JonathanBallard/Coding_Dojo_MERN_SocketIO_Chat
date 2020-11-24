
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
    console.log('Nice to meet you: Socket ID:', socket.id, ' **handshake**');
    socket.emit("Welcome", 'testing')
    socket.on('toastOut', data => {
        console.log('toastDAta: ' + data)
        socket.emit("toast", data);
    });

    socket.on('toast', (data) => {
        console.log("THIS IS THE TOAST TEST")
        const userToast = 'Welcome new user: ' + data;
        socket.emit("send_data_to_all_other_clients", userToast)
    })
    socket.on('message', (data) => {
        console.log("THIS IS THE OUTGOING MESSAGE TEST")

        //rather than simply emitting here, we want to send data into a <Message> format
        socket.emit("send_data_to_all_other_clients", data)
    })

    socket.on("disconnect", () => {
        console.log('Client Disconnected');
    })

});





