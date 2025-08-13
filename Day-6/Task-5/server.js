const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

// Path to JSON file
const dataFilePath = path.join(__dirname, "users.json");

// Helper function to read users from file
function readUsers() {
  const data = fs.readFileSync(dataFilePath, "utf8");
  return JSON.parse(data);
}

// Helper function to write users to file
function writeUsers(users) {
  fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2), "utf8");
}

// GET /users - get all users
app.get("/users", (req, res) => {
  const users = readUsers();
  res.json(users);
});

// GET /users/:id - get user by ID
app.get("/users/:id", (req, res) => {
  const users = readUsers();
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});

// POST /users - create a new user
app.post("/users", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  const users = readUsers();
  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    name
  };

  users.push(newUser);
  writeUsers(users);

  res.status(201).json({ message: "User added", user: newUser });
});

// PUT /users/:id - update user
app.put("/users/:id", (req, res) => {
  const { name } = req.body;
  const userId = parseInt(req.params.id);

  let users = readUsers();
  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  users[userIndex].name = name;
  writeUsers(users);

  res.json({ message: "User updated", user: users[userIndex] });
});

// DELETE /users/:id - delete user
app.delete("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);

  let users = readUsers();
  const newUsers = users.filter(u => u.id !== userId);

  if (newUsers.length === users.length) {
    return res.status(404).json({ message: "User not found" });
  }

  writeUsers(newUsers);
  res.json({ message: "User deleted" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
