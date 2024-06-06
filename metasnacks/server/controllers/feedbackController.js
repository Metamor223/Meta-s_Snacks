const { User,Message } = require("../models/models");
const jwt = require('jsonwebtoken')

class FeedbackController {
    constructor(server) {
        this.users = {};
        this.server = server; // Store the server instance

        this.server.on('connection', (ws) => {
            console.log('User connected:', ws.id);

            ws.on('auth', async (token) => {
                try {
                    const decoded = jwt.verify(token, process.env.SECRET_KEY);
                    const userId = decoded.id;

                    const user = await User.findByPk(userId);
                    if (!user) {
                        return ws.emit('error', 'Invalid token'); // More specific error message
                    }

                    this.users[ws.id] = user; // Store the user object, not just the ID
                    ws.join(`room-${user.id}`);
                    console.log(`User ${user.id} joined room-${user.id}`);

                    // Send initial user list to admins
                    if (user.role === 'ADMIN') {
                        this.sendAdminUserList(ws);
                    }

                    // Send unread messages to the user
                    this.sendUnreadMessages(ws, user.id);

                } catch (error) {
                    console.error('Authorization error:', error);
                    ws.emit('error', 'Authorization error');
                }
            });

            ws.on('message', async (data) => {
                try {
                    const sender = this.users[ws.id];
                    if (!sender) {
                        return ws.emit('error', 'Not authorized');
                    }

                    const { receiverId, text } = data;

                    const message = await Message.create({
                        senderId: sender.id,
                        receiverId,
                        text
                    });

                    const messageData = {
                        senderId: sender.id,
                        text,
                        timestamp: message.createdAt.getTime(), // Use message creation timestamp
                    };

                    ws.to(`room-${receiverId}`).emit('message', messageData);

                    // Send to admin if the sender is a user
                    if (sender.role === 'USER') {
                        const admin = await User.findOne({ where: { role: 'ADMIN' } });
                        if (admin) {
                            ws.to(`room-${admin.id}`).emit('message', messageData);
                        }
                    }

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
    }

    // Helper function to send the user list to admins
    async sendAdminUserList(ws) {
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
    }
}

module.exports = FeedbackController;