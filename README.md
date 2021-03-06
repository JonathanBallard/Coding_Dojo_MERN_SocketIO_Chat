# SocketIO Chat Program with React client

#### **INSTRUCTIONS**
- **DONE** Create wireframes (welcome screen, chat screen)
- **DONE** Create welcome screen
- **DONE** Allow user to choose a screen name to be saved in state on welcome screen
- **DONE** Upon user joining chat page, broadcast a message to all other users
- **DONE** Allow users to send chat messages
- **DONE** Upon joining chat room, new user should be able to see previous messages (bonus)
- **DONE** Ensure there are no duplicate usernames (optional)
- **DONE** Ensure the newest message is always on screen: keep chat messages scrolled to bottom (bonus)
- Create different chat rooms that users can join where they only interact with others in their room (bonus)

#### **TODO**
- **DONE** Hide messages until name chosen
- **DONE** Hide My Name... entry once name is chosen
- **DONE** Add styling to messages
- **DONE** Add styling to welcome screen
- **DONE** Test messages actually sent through server
- **DONE** Broadcast toast when user enters chat
- **DONE** Change message background based on whether or not you are the message sender
- **DONE** User's messages will show on right side, others will show on left side
- **DONE** Need to prevent React from losing the 'hidden' class for the username entry upon reloading
- **DONE** Emit the 'messageToSend' from Speak.js
- **DONE** Fix username not being passed down through props properly
- **DONE** Only 1 message being shown at a time currently
- **DONE** Check for new connections randomly (am getting repeated test messages)
- **DONE** Swap messages array over to server (?)
- **DONE** Don't store components in state
- **DONE** When opening up chat, see all old messages from others
- **DONE** Date/Time currently changes to match current time whenever a new message is sent
- **DONE** Restyle header
- **DONE** Increase the size of the message entry box
- **DONE** Add logout button
- **DONE** Fix Logout Button (splice function)
- **DONE** Keep scrolled to bottom
- **DONE** Style it up buttercup
- **DONE** Organize messages by time sent
- **DONE** Redo Autoscroll, Toast
- **DONE** If you log out of chat and re-enter, all your old messages should be shown as not you
- **DONE** Fix showing previous messages when you login to chat while having NOT been on chat site login page
- **DONE** Better styling on my submit buttons
- **DONE** Add length check to sent messages
- **DONE** Users must have a name > 2 characters
- **DONE** Fix Toasting yourself not showing up in 'user' color
- **DONE** Usernames still not freeing up when user refreshes page
- **DONE** Move LOGOUT button
- **DONE** Figure out why a single message is sent from server but multiple are added by messages.js
- **DONE** Work on performance issues, especially around setMessageArr
- **DONE** Fix scrollbar not scrolling down again
- **DONE** Set long messages to wrap
- **DONE** Restyle toasts to be bigger
- **DONE** Username length warning comes up when user is typing

- **CANCELLED** Fix scrollbar for full page should NOT be styled
- **CANCELLED** Message length warning comes up when user is typing

#### **OPTIONAL FUNCTIONALITY TO CONSIDER**
- Change messages background color for each different user (?)
- Add color chooser on login screen (?)
- Add change name button (?)

#### **FLOWCHART**
- User chooses username on client, sends username to server
- Server toasts username
- Client hides <Welcome> and shows <Chat>
- User sends message data through client and <Speak> to server
- Server adds message to list of all messages from all clients
- Client receives array of all messages from server through <Messages>, turns the array of message metadata into a <Message> component
- Client renders <Message> components in an array
