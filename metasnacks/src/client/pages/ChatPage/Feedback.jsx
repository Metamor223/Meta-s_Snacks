import React, { useContext, useEffect, useRef, useState } from 'react';
import { observer } from "mobx-react-lite";
import "./Feedback.css";
import { Context } from "../../../index";
import { fetchUserDetail, fetchUsers } from "../../http/userAPI";

const Feedback = observer(() => {
    const { user } = useContext(Context);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [selectedUserId, setSelectedUserId] = useState(null); // To store the selected user for chat
    const [userList, setUserList] = useState([]); // To store the list of users
    const ws = useRef(null);

    useEffect(() => {
        ws.current = new WebSocket('ws://localhost:3001');

        ws.current.onopen = () => {
            console.log('WebSocket connected');
            if (user.isAuth) {
                const token = localStorage.getItem('token');
                if (token) {
                    // Check readyState before sending
                    if (ws.current.readyState === WebSocket.OPEN) {
                        ws.current.send(JSON.stringify({ type: 'auth', token }));
                    } else {
                        console.warn('WebSocket not ready yet.');
                    }
                } else {
                    console.error('Token not found in localStorage');
                }
            }
        };

        ws.current.onmessage = (event) => {
            const messageData = JSON.parse(event.data);

            switch (messageData.type) {
                case 'authSuccess':
                    console.log('Authentication successful:', messageData);
                    user.setUser({ id: messageData.userId, role: messageData.role });
                    fetchUserDetail(messageData.userId)
                        .then(userDetails => {
                            const completeUserDetails = {
                                ...userDetails,
                                id: messageData.userId,
                                role: messageData.role
                            };
                            // Update UserStore with complete details
                            user.setUser(completeUserDetails);
                        })
                        .catch(error => {
                            console.error('Error fetching user details:', error);
                        });
                    break;
                case 'message':
                    // Add the message to the messages array
                    setMessages(prevMessages => [...prevMessages, messageData]);
                    break;
                case 'error':
                    console.error('Error from server:', messageData.message);
                    break;
                default:
                    console.log('Unknown message type:', messageData.type);
            }
        };

        ws.current.onclose = () => {
            console.log('WebSocket disconnected');
            ws.current = null;
        };

        ws.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        // Cleanup on component unmount
        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, [user.isAuth]); // Ensure effect runs again when user.isAuth changes

    useEffect(() => {
        // Fetch the user list when the component mounts or when user.isAuth changes
        if (user.isAuth) {
            fetchUsers().then(data => setUserList(data));
        }
    }, [user.isAuth]);

    const sendMessage = () => {
        if (newMessage.trim() !== '' && ws.current && ws.current.readyState === WebSocket.OPEN && selectedUserId) {
            const message = {
                type: 'message',
                receiverId: selectedUserId,
                text: newMessage
            };
            ws.current.send(JSON.stringify(message));
            setNewMessage('');
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-list">
                <h2>Users</h2>
                <ul>
                    {/* Conditionally render user list */}
                    {userList.length > 0 ? (
                        userList.map((user) => (
                            <li
                                key={user.id}
                                onClick={() => setSelectedUserId(user.id)}
                                className={selectedUserId === user.id ? 'active-user' : ''}
                            >
                                {user.username || user.email}
                            </li>
                        ))
                    ) : (
                        <p>Loading users...</p> // Or a loading indicator
                    )}
                </ul>
            </div>

            <div className="chat-window">
                {selectedUserId ? (
                    <>
                        <h3>Chat with {userList.find(user => user.id === selectedUserId)?.username || userList.find(user => user.id === selectedUserId)?.email}</h3>
                        <ul>
                            {messages
                                .filter(message => (message.senderId === user.User.id && message.receiverId === selectedUserId) ||
                                    (message.receiverId === user.User.id && message.senderId === selectedUserId))
                                .map((message, index) => (
                                    <li
                                        key={index}
                                        className={message.senderId === user.User.id ? 'sent-message' : 'received-message'}
                                    >
                                        {message.text} ({new Date(message.timestamp).toLocaleTimeString()})
                                    </li>
                                ))}
                        </ul>
                        <div className="input-area">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                            <button onClick={sendMessage} disabled={!selectedUserId || !ws.current || ws.current.readyState !== WebSocket.OPEN}>
                                Send
                            </button>
                        </div>
                    </>
                ) : (
                    <p>Select a user to start chatting</p>
                )}
            </div>
        </div>
    );
});

export default Feedback;
