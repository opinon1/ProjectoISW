// Import the required modules
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

//TODO

//config .env file

// Create an Express application
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Set up the MySQL connection
const pool = mysql.createPool({
  host: process.env.SERVER_HOST,
  user: process.env.USER, // Your MySQL username
  password: process.env.SERVER_PASSWORD, // Your MySQL password
  database: 'your_database_name', // Your MySQL database name
  port: process.env.SERVER_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test MySQL connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Successfully connected to the database');
  connection.release();
});

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Define a test API to fetch data from MySQL
app.get('/api/data', (req, res) => {
  pool.query('SELECT * FROM `your_table_name`', (error, results, fields) => {
    if (error) {
      return res.status(500).json({ error: 'Database query error' });
    }
    res.json({ data: results });
  });
});

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});