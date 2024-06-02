const { User,Message } = require("../models/models");
const jwt = require('jsonwebtoken')

class FeedbackController {
    /*constructor(io) {
        if (!io) {
            throw new Error('Socket.io instance is required');
        }
        this.io = io;
        this.users = {}; // Хранение активных пользователей

        this.io.on('connection', (socket) => {
            console.log('User connected:', socket.id);
            // Обработка авторизации (проверка токена)
            socket.on('auth', async (token) => {
                try {
                    const decoded = jwt.verify(token, process.env.SECRET_KEY); // Проверка токена
                    const userId = decoded.id;

                    const user = await User.findByPk(userId); // userId из токена
                    if (!user) {
                        return socket.emit('error', 'Неверный токен');
                    }

                    this.users[socket.id] = user.id; // Сохраняем ID пользователя
                    socket.join(`room-${user.id}`); // Подключаем к комнате пользователя
                    console.log(`User ${user.id} joined room-${user.id}`);

                    if (user.role === 'ADMIN') {
                        const users = await User.findAll({ where: { role: 'USER' } });
                        socket.emit('userList', users);
                    }

                } catch (error) {
                    console.error('Ошибка авторизации:', error);
                    socket.emit('error', 'Ошибка авторизации');
                }
            });

            socket.on('message', async (data) => {
                try {
                    const sender = this.users[socket.id];
                    if (!sender) {
                        return socket.emit('error', 'Не авторизован');
                    }

                    const { receiverId, text } = data;

                    const message = await Message.create({
                        senderId: sender.id,
                        receiverId,
                        text
                    });

                    // Отправляем сообщение получателю
                    socket.to(`room-${receiverId}`).emit('message', {
                        senderId: sender.id,
                        text,
                        timestamp: Date.now(),
                    });

                    if (sender.role === 'USER') {
                        const admin = await User.findOne({ where: { role: 'ADMIN' } });
                        if (admin) {
                            socket.to(`room-${admin.id}`).emit('message', {
                                senderId: sender.id,
                                text,
                                timestamp: Date.now(),
                            });
                        }
                    }

                } catch (error) {
                    console.error('Ошибка отправки сообщения:', error);
                    socket.emit('error', 'Ошибка отправки сообщения');
                }
            });

            socket.on('disconnect', () => {
                const userId = this.users[socket.id];
                if (userId) {
                    delete this.users[socket.id];
                    socket.leave(`room-${userId}`);
                    console.log(`User ${userId} left room-${userId}`);
                }
            });
        });
    }*/
}

module.exports = new FeedbackController();