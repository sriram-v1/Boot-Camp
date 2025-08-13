// server.js
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

const usersFile = path.join(__dirname, "users.json");

// Helper: Read users
function readUsers() {
  if (!fs.existsSync(usersFile)) return [];
  return JSON.parse(fs.readFileSync(usersFile, "utf8"));
}

// Helper: Write users
function writeUsers(users) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

// Middleware: Error handler
function errorHandler(err, req, res, next) {
  console.error(err.stack); // Log error to console

  res.status(err.status || 500).json({
    error: {
      code: err.code || "INTERNAL_SERVER_ERROR",
      message: err.message || "Something went wrong on the server"
    }
  });
}

// POST /users → Add user with validation
app.post("/users", (req, res, next) => {
  try {
    const { name, age } = req.body;

    // Validation
    if (!name || typeof name !== "string") {
      const error = new Error("Name is required and must be a string");
      error.status = 400;
      error.code = "INVALID_NAME";
      throw error;
    }

    if (age === undefined || typeof age !== "number") {
      const error = new Error("Age is required and must be a number");
      error.status = 400;
      error.code = "INVALID_AGE";
      throw error;
    }

    // Save user
    const users = readUsers();
    const newUser = { id: Date.now(), name, age };
    users.push(newUser);
    writeUsers(users);

    res.status(201).json({
      message: "User added successfully",
      user: newUser
    });

  } catch (err) {
    next(err); // Pass to error handler
  }
});

// GET /users → Get all users
app.get("/users", (req, res, next) => {
  try {
    const users = readUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// GET /users/:id → Get user by ID
app.get("/users/:id", (req, res, next) => {
  try {
    const users = readUsers();
    const user = users.find(u => u.id === Number(req.params.id));

    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      error.code = "USER_NOT_FOUND";
      throw error;
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
});

// Catch-all route for undefined endpoints
app.use((req, res) => {
  res.status(404).json({
    error: {
      code: "ENDPOINT_NOT_FOUND",
      message: "The requested endpoint does not exist"
    }
  });
});

// Central error handler
app.use(errorHandler);

// Start server
app.listen(3000, () => console.log("Server running on port 3000"));
