const express = require('express');
const cors = require('cors');

const app = express();

// Разрешаем все запросы с указанных источников
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, // Разрешаем отправлять куки и HTTP-аутентификацию
}));