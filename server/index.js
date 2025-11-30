const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'students.json');

function readStudents() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

app.get('/api/students', (req, res) => {
  const students = readStudents();
  res.json({students});
});

app.post('/api/login', (req, res) => {
  const { rollNo, password } = req.body || {};
  if (!rollNo || !password) return res.status(400).json({ error: 'rollNo and password required' });
  const students = readStudents();
  const user = students.find(s => s.rollNo === rollNo && s.password === password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const safeUser = { ...user };
  delete safeUser.password;
  res.json({ user: safeUser });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
