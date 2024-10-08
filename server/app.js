const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');
const path = require('path'); // Make sure the 'path' module is required
const app = express();

// Serve static files from the main project directory (where index.html is located)
app.use(express.static(path.join(__dirname, '../')));

// Route to serve index.html when accessing the root ('/')
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// Route to retrieve all tasks from the database
app.get('/tasks', (req, res) => {
    const sql = 'SELECT * FROM tasks';  // Fetch all tasks
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ tasks: rows });
    });
});

// Route to add a new task
app.post('/addTask', (req, res) => {
    const { name } = req.body;
    const sql = 'INSERT INTO tasks (name, completed) VALUES (?, ?)';
    const params = [name, 0];  // New tasks are not completed
    db.run(sql, params, function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID, name, completed: 0 });
    });
});

// Route to update a task's completion status
app.put('/updateTask/:id', (req, res) => {
    const { completed } = req.body;
    const sql = 'UPDATE tasks SET completed = ? WHERE id = ?';
    const params = [completed ? 1 : 0, req.params.id];
    db.run(sql, params, function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Task updated successfully' });
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
