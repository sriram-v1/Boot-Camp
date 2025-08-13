const express = require("express"); // Import Express
const app = express(); // Create an instance of Express
const PORT = 3001; // Define the port number

const users = [
    { id: 1, name: "Swathi" },
    { id: 2, name: "Jane" }
];

// Define the /users endpoint
app.get("/users", (req, res) => {  
    res.json(users); // Send JSON response
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 