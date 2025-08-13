// server.js
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json()); // For parsing JSON request body

// Connect to MongoDB
mongoose.connect("mongodb+srv://sriramvenkatesan2005:sriram12345@cluster0.jfi8dso.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Student Schema & Model
const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    major: String,
    rollNo: { type: String, unique: true }
});
const Student = mongoose.model("Student", studentSchema);

// GET all students
app.get("/students", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: "Error fetching students" });
    }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
