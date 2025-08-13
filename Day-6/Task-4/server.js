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

// POST /users - add a new user
app.post("/users", (req, res) => {
  const { name } = req.body; // Destructure name from body

  // Validation
  if (!name || name.trim() === "") {
    return res.status(400).json({ message: "Name is required" });
  }

  // Create new user object
  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    name: name.trim()
  };

  // Add to array
  users.push(newUser);

  // Send response
  res.status(201).json({
    message: "User added successfully",
    user: newUser
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
