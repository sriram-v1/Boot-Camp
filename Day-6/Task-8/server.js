/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
app.post("/users", (req, res) => {
  try {
    const { name, age } = req.body;

    // Validate name
    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({
        error: {
          code: "INVALID_NAME",
          message: "Name is required and must be a non-empty string"
        }
      });
    }

    // Validate age
    if (
      typeof age !== "number" ||
      !Number.isInteger(age) ||
      age <= 0
    ) {
      return res.status(400).json({
        error: {
          code: "INVALID_AGE",
          message: "Age is required and must be a positive integer"
        }
      });
    }

    // Read current users
    const users = readUsers();

    // Generate unique ID (incremental)
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;

    // Create user object
    const newUser = { id: newId, name: name.trim(), age };

    // Save user
    users.push(newUser);
    writeUsers(users);

    // Send success response
    res.status(201).json({
      message: "User created successfully",
      user: newUser
    });

  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong while creating the user"
      }
    });
  }
});
