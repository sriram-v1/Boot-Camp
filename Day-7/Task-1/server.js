const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json()); // To parse JSON body

// Connect to MongoDB
mongoose.connect("mongodb+srv://sriramvenkatesan2005:sriram12345@cluster0.jfi8dso.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Schema & Model
const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    major: { type: String, required: true },
    rollNo: { type: String, required: true, unique: true }
});
const Student = mongoose.model("Student", studentSchema);

// POST - Create a student
app.post("/students", async (req, res) => {
    try {
        const { name, age, major, rollNo } = req.body;

        // Validate required fields
        if (!name || !age || !major || !rollNo) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check for duplicate rollNo
        const existing = await Student.findOne({ rollNo });
        if (existing) {
            return res.status(409).json({ error: "rollNo already exists" });
        }

        const student = new Student({ name, age, major, rollNo });
        await student.save();

        res.status(201).json({
            message: "Student added successfully",
            studentId: student._id
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
