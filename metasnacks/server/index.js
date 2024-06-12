require('dotenv').config()
const express = require('express')
const app = express()
const WebSocket = require('express-ws')(app);
const aWss = WebSocket.getWss()
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandingMiddleware')
const fileUpload = require('express-fileupload')
const path = require('path')
const FeedBackController = require('./controllers/feedbackController');

const { User,Message } = require("./models/models");
const jwt = require("jsonwebtoken");
const connectedClients =  {}; // Все подключенные клиенты
const rooms = {}; // Объект для хранения комнат

const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname,'static')))
app.use(fileUpload({}))
app.use('/api', router)

app.use(errorHandler)

app.ws('/', (ws, req) => {
    console.log('New WebSocket connection!');

    ws.on('message', async (message) => {
        try {
            const data = JSON.parse(message);
            switch (data.type) {
                case 'auth':
                    const token = data.token;
                    try {
                        const decoded = jwt.verify(token, process.env.SECRET_KEY);
                        const userId = decoded.id;
                        const user = await User.findByPk(userId);
                        if (user) {
                            connectedClients[ws._socket.remoteAddress] = user;
                            ws.send(JSON.stringify({ type: 'authSuccess', userId: user.id }));
                            console.log(`User ${userId} authenticated and connected.`);
                        } else {
                            ws.send(JSON.stringify({ type: 'error', message: 'Invalid token' }));
                        }
                    } catch (error) {
                        console.error('Authentication error:', error);
                        ws.send(JSON.stringify({ type: 'error', message: 'Authentication failed' }));
                    }
                    break;
                case 'message':
                    const { receiverId, text } = data;
                    const sender = connectedClients[ws._socket.remoteAddress];
                    if (sender) {
                        try {
                            const newMessage = await Message.create({
                                senderId: sender.id,
                                receiverId,
                                text,
                                timestamp: new Date()
                            });

                            ws.send(JSON.stringify({
                                type: 'message',
                                senderId: sender.id,
                                receiverId: receiverId,
                                text: newMessage.text,
                                timestamp: newMessage.timestamp
                            }));

                            for (const clientId in connectedClients) {
                                if (connectedClients[clientId].id === receiverId) {
                                    const receiverSocket = app.ws.getWss().clients[clientId];
                                    if (receiverSocket && receiverSocket.readyState === WebSocket.OPEN) {
                                        receiverSocket.send(JSON.stringify({
                                            type: 'message',
                                            senderId: sender.id,
                                            receiverId: receiverId,
                                            text: newMessage.text,
                                            timestamp: newMessage.timestamp
                                        }));
                                    }
                                }
                            }

                        } catch (error) {
                            console.error('Error saving message:', error);
                            ws.send(JSON.stringify({ type: 'error', message: 'Failed to send message' }));
                        }
                    } else {
                        ws.send(JSON.stringify({ type: 'error', message: 'Not authorized' }));
                    }
                    break;

                default:
                    console.log('Unknown message type:', data.type);
            }
        } catch (error) {
            console.error('Error handling message:', error);
            ws.send(JSON.stringify({ type: 'error', message: 'Invalid message format' }));
        }
    });

    ws.on('close', () => {
        console.log('Connection closed');
        delete connectedClients[ws._socket.remoteAddress];
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()

        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    }
    catch (e) {
        console.log(e)
    }
}
start()


//ЧАТОВАЯ ЗОНА
//----------------------------------------------------------------------------------------------------------

/*const connectionHandler = (ws, msg) => {
    ws.id = msg.id
    broadcastConnection(ws,msg)
}

const broadcastConnection = (ws,msg)=>{
    aWss.clients.forEach(client=>{
        if(client.id === msg.id){
            client.send(`Пользователь ${msg.username} подключился`)
        }
    })
}*/

module.exports = app;