import React, {useContext, useEffect, useRef, useState} from 'react';
import {observer} from "mobx-react-lite";
import "./Feedback.css"

const Feedback = observer(() => {

    const [selectedUserId, setSelectedUserId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [userList, setUserList] = useState([]); // For admins
    const [connected, setConnected] = useState(false);
    const ws = useRef(null);
    const [selectedChat, setSelectedChat] = useState(null);

    useEffect(() => {

        ws.current = new WebSocket('ws://localhost:3001');

        ws.current.onopen = () => {
            console.log('WebSocket connected!');
            setConnected(true);

            const token = localStorage.getItem('token');
            if (token) {
                ws.current.send(JSON.stringify({ type: 'auth', token }));
            }
        };

        ws.current.onmessage = (event) => {
            const messageData = JSON.parse(event.data);
            console.log('Message received:', messageData);

            switch (messageData.type) {
                case 'message':
                    setMessages(prevMessages => [...prevMessages, messageData]);
                    break;
                case 'userList':
                    setUserList(messageData.users);
                    break;
                case 'error':
                    console.error('Error from server:', messageData.message);
                    break;
                default:
                    console.warn('Unknown message type:', messageData.type);
            }
        };

        ws.current.onclose = () => {
            console.log('WebSocket closed');
            setConnected(false);
        };

        // Cleanup on component unmount
        return () => {
            ws.current.close();
        };
    }, []);

    const sendMessage = () => {
        if (newMessage.trim() !== '' && ws.current.readyState === WebSocket.OPEN) {

            const receiverId = selectedUserId;

            const message = {
                type: 'message',
                receiverId,
                text: newMessage
            };
            ws.current.send(JSON.stringify(message));
            setNewMessage('');
        }
    };

    return (
    <div className="feedbackCON">
      <h2>Chats</h2>
        <div className="ChatGroup">
            <div className="сhat-list">
                <ul>
                    {userList.map((user) => (
                        <li
                            key={user.id}
                            onClick={() => setSelectedChat(user.id)}
                            className={selectedChat === user.id ? 'active-chat' : ''} // Add "active" class if selected
                        >
                            {user.username}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="Dialogue">
                {selectedChat ? ( // Conditionally render the chat window
                    <>
                        <div className="chat-header">
                            <h3>Chat with {userList.find(user => user.id === selectedChat)?.username}</h3>
                        </div>
                        <div className="chat-messages">
                            <ul>
                                {messages
                                    .filter(message =>
                                        message.senderId === selectedChat ||
                                        message.receiverId === selectedChat
                                    )
                                    .map((message, index) => (
                                        <li key={index} className={message.senderId === user.User.id ? 'sent-message' : 'received-message'}>
                                            {message.text}
                                            ({new Date(message.timestamp).toLocaleTimeString()})
                                        </li>
                                    ))}
                            </ul>
                        </div>
                        <div className="chat-input">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                            <button onClick={sendMessage} disabled={!connected}>
                                Send
                            </button>
                        </div>
                    </>
                ) : (
                    <p>Select a chat to start messaging.</p>
                )}
            </div>
        </div>
    </div>
  );
})

export default Feedback;