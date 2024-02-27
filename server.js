// Import required modules
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

// Create Express app
const app = express();
const port = 3000;

// MySQL Connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'Itp@ssw0rd',
    database: 'password_manager'
});

// Connect to MySQL database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database as ID ' + connection.threadId);
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes

// POST route to save password
app.post('/save', (req, res) => {
    const { url, username, password } = req.body;
    const sql = `INSERT INTO passwords (url, username, password) VALUES (?, ?, ?)`;
    connection.query(sql, [url, username, password], (err, result) => {
        if (err) {
            console.error('Error saving password:', err);
            res.status(500).send('Error saving password');
            return;
        }
        res.status(200).send('Password saved successfully!');
    });
});

// GET route to retrieve passwords
app.get('/passwords', (req, res) => {
    connection.query(`SELECT * FROM passwords`, (err, results) => {
        if (err) {
            console.error('Error fetching passwords:', err);
            res.status(500).send('Error fetching passwords');
            return;
        }
        res.status(200).json(results);
    });
});

// DELETE route to delete password by id
app.delete('/delete/:id', (req, res) => {
    const passwordId = req.params.id;
    connection.query(`DELETE FROM passwords WHERE id = ?`, [passwordId], (err, result) => {
        if (err) {
            console.error('Error deleting password:', err);
            res.status(500).send('Error deleting password');
            return;
        }
        res.status(200).send('Password deleted successfully!');
    });
});

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Start Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Serve static files
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
