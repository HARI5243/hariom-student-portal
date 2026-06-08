const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

app.post('/api/calculate-cgpa', (req, res) => {
  const scores = Array.isArray(req.body.marks) ? req.body.marks.map(Number) : [];
  if (scores.length !== 3 || scores.some((value) => Number.isNaN(value) || value < 0 || value > 100)) {
    return res.status(400).json({ success: false, message: 'Please submit three valid marks between 0 and 100.' });
  }

  const total = scores.reduce((sum, value) => sum + value, 0);
  const percentage = parseFloat(((total / (scores.length * 100) * 100)).toFixed(1));
  const cgpa = parseFloat((percentage / 9.5).toFixed(2));

  res.json({ success: true, percentage, cgpa, message: 'CGPA calculated successfully.' });
});

app.post('/api/contact', (req, res) => {
  const name = String(req.body.name || '').trim();
  const email = String(req.body.email || '').trim();
  const message = String(req.body.message || '').trim();

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'All contact fields are required.' });
  }

  console.log('Contact form submission:', { name, email, message, submittedAt: new Date().toISOString() });

  res.json({ success: true, message: 'Thank you! Your message has been received and will be reviewed soon.' });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
