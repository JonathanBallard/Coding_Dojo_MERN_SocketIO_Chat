# SocketIO Chat Program with React client

- **DONE** Create wireframes (welcome screen, chat screen)
- **DONE** Create welcome screen
- **DONE** Allow user to choose a screen name to be saved in state on welcome screen
- Ensure there are no duplicate usernames (optional)
- Upon user joining chat page, broadcast a message to all other users
- **DONE** Allow users to send chat messages
- Ensure the newest message is always on screen: keep chat messages scrolled to bottom (bonus)
- Upon joining chat room, new user should be able to see previous messages (bonus)
- Create different chat rooms that users can join where they only interact with others in their room (bonus)

- **DONE** Hide messages until name chosen
- **DONE** Hide My Name... entry once name is chosen
- **DONE** Add styling to messages
- **DONE** Add styling to welcome screen
- **DONE** Test messages actually sent through server
- Organize messages by time sent
- **DONE** Broadcast toast when user enters chat
- Change message background based on whether or not you are the message sender
- User's messages will show on right side, others will show on left side
- Change messages background color based on user?
- **DONE** Need to prevent React from losing the 'hidden' class for the username entry upon reloading
- **DONE** Emit the 'messageToSend' from Speak.js
- Fix username not being passed down through props properly
- **DONE** Only 1 message being shown at a time currently
- Check for new connections randomly (am getting repeated test messages)
- Keep scrolled to bottom
- Style it up buttercup
- Increase the size of the message entry box
- Swap messages array over to server

- **FLOWCHART**
- User chooses username on client, sends username to server
- Server toasts username
- Client hides <Welcome> and shows <Chat>
- User sends message through client and <Chat> to server
- Server emits message
- Client receives message from server through <Messages>, turns the message into a <Message>
- Client renders <Messages>
