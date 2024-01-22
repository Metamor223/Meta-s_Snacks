// server.js
const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Metasnacks',
  password: '89119387037',
  port: 5432,
});

// Обработчик GET-запроса
app.get('/api/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Обработчик POST-запроса для добавления данных
app.post('/api/addData', async (req, res) => {
    const { Login, organisation_name, ITN, password, role } = req.body;
  
    try {
      const result = await pool.query(
        'INSERT INTO your_table (login, organisation_name, itn, pass, role) VALUES ($1, $2, $3, $4) RETURNING *',
        [Login, organisation_name, ITN, password, role]
      );
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
