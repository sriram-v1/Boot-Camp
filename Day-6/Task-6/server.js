// POST /users → Add a new user
app.post("/users", (req, res) => {
  try {
    const { name, age } = req.body;

    // 1️⃣ Validate name
    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({
        error: {
          code: "INVALID_NAME",
          message: "Name is required and must be a non-empty string"
        }
      });
    }

    // 2️⃣ Validate age
    if (typeof age !== "number" || isNaN(age) || age <= 0) {
      return res.status(400).json({
        error: {
          code: "INVALID_AGE",
          message: "Age is required and must be a positive number"
        }
      });
    }

    // 3️⃣ Read existing users
    const users = readUsers();

    // 4️⃣ Generate unique ID (incremental)
    const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;

    const newUser = {
      id: newId,
      name: name.trim(),
      age
    };

    // 5️⃣ Save new user
    users.push(newUser);
    writeUsers(users);

    // 6️⃣ Respond with success
    res.status(201).json({
      message: "User created successfully",
      user: newUser
    });

  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong while creating the user"
      }
    });
  }
});
