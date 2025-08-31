// server.js

// 1. Import Express
const express = require('express');

// 2. Create an Express app
const app = express();

// 3. Set a port
const PORT = 3000;

// 4. Define a route
app.get('/', (req, res) => {
  res.send('Hello World! Welcome to my Express server.');
});
app.get("/aliexpress/callback", async (req, res) => {
  const code = req.query.code; // هذا الـ Authorization Code
  const state = req.query.state; // اختياري، للتحقق من الأمان

  if (!code) {
    return res.status(400).send("No authorization code received!");
  }


// 5. Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
