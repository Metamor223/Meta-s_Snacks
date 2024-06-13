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

module.exports = app;