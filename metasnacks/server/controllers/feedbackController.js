const { User,Message } = require("../models/models");
const jwt = require('jsonwebtoken')


class FeedbackController {
    constructor(server) {

        server.ws('/', (ws, req) => {
            console.log('Подключение установлено')
            ws.send('ты подключился к чату')
            server.on('connection', (ws) => {
                console.log('User connected:', ws.id);

                ws.on('auth', (token) => { // No need for async here
                    try {
                        const decoded = jwt.verify(token, process.env.SECRET_KEY);
                        const userId = decoded.id;

                        // Instead of fetching from the database, create a mock user object
                        const user = {
                            id: userId,
                            role: decoded.role || 'USER' // Assume user role if not in token
                        };

                        this.users[ws.id] = user;
                        ws.join(`room-${user.id}`);
                        console.log(`User ${user.id} joined room-${user.id}`);

                        // ... [You can remove the sendAdminUserList and sendUnreadMessages calls as they are database-dependent] ...

                    } catch (error) {
                        console.error('Authorization error:', error);
                        ws.emit('error', 'Authorization error');
                    }
                });

                ws.on('message', (data) => { // No need for async here
                    try {
                        const sender = this.users[ws.id];
                        if (!sender) {
                            return ws.emit('error', 'Not authorized');
                        }

                        const {receiverId, text} = data;

                        // Construct the message data
                        const messageData = {
                            senderId: sender.id,
                            text,
                            timestamp: Date.now(),
                        };

                        ws.to(`room-${receiverId}`).emit('message', messageData);

                        // ... [Remove the admin-related logic if you're not using roles] ...

                    } catch (error) {
                        console.error('Message sending error:', error);
                        ws.emit('error', 'Message sending error');
                    }
                });

                ws.on('disconnect', () => {
                    const user = this.users[ws.id]; // Use the user object
                    if (user) {
                        delete this.users[ws.id];
                        ws.leave(`room-${user.id}`);
                        console.log(`User ${user.id} left room-${user.id}`);
                    }
                });
            });
        })
    }
    // Helper function to send the user list to admins
    /*async sendAdminUserList(ws) {
        const users = await User.findAll({ where: { role: 'USER' } });
        ws.emit('userList', users);
    }

    // Helper function to send unread messages to a user
    async sendUnreadMessages(ws, userId) {
        const messages = await Message.findAll({
            where: { receiverId: userId }
        });
        messages.forEach(message => {
            ws.emit('message', {
                senderId: message.senderId,
                text: message.text,
                timestamp: message.createdAt.getTime()
            });
        });
    }*/
}

module.exports = FeedbackController;