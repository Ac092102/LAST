const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/submit', (req, res) => {
  const { name, student_id, score, total } = req.body;

  const query = 'INSERT INTO submissions (name, student_id, score, total) VALUES (?, ?, ?, ?)';
  db.query(query, [name, student_id, score, total], (err) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ message: 'Submission saved' });
  });
});

app.get('/admin/results', (req, res) => {
  db.query('SELECT * FROM submissions ORDER BY submitted_at DESC', (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
