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

// 5. Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
