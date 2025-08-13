// server.js
const express = require("express");
const app = express();

app.use(express.json()); // Middleware to parse JSON body

// Hardcoded array of users
let users = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" }
];

// GET /users - return list of users
app.get("/users", (req, res) => {
  res.json(users);
});

// GET /users/:id - return specific user by ID
app.get("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id); // Convert ID to number
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
