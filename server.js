require('dotenv').config();  // Load .env
const express = require('express');
const { message } = require('statuses');
const app = express();
const PORT = process.env.PORT;

app.use(express.json()); // Parses JSON bodies automatically

app.use((req, res, next) => {
    // Logs every request
    console.log(`${req.method} ${req.url} - ${new Date()}`);
    next(); // Pass to next handler (required!)
});

//app.use(express.static(path.join(__dirname, 'public'))); // Serve static HTML file (public/index.html)

app.get("/", (req, res) => {
  res.send("My Week 2 API!");
});

app.get('/user/:id', (req, res) => {   // :id = placeholder
  const userId = req.params.id;   // Access: "123"
  console.log(userId);
  res.send(`User ${userId} profile`);
});


app.post("/user", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Missing required fields: name and email are required.' });
  }
  console.log(req.body);
  res.json({ message: `Hello, ${name}!`}); // req.body now available!
});

app.use((req, res) => {  // Error handler for unknown routes
  res.status(404).send('Page not found :(');
});

app.use((err, req, res, next) => {
  console.error(err.stack);  // Log for debugging
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
});
