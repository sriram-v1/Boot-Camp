const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json()); // Parse JSON body

// ===== 1. Connect to MongoDB =====
mongoose.connect("mongodb+srv://sriramvenkatesan2005:sriram12345@cluster0.jfi8dso.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// ===== 2. Student Schema & Model =====
const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    major: { type: String, required: true },
    rollNo: { type: String, required: true, unique: true }
});
const Student = mongoose.model("Student", studentSchema);

// ===== 3. POST - Create a student =====
app.post("/students", async (req, res) => {
    try {
        const { name, age, major, rollNo } = req.body;

        if (!name || !age || !major || !rollNo) {
            return res.status(400).json({ error: "All fields are required" });
        }

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

// ===== 4. GET - All students =====
app.get("/students", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: "Error fetching students" });
    }
});

// ===== 5. GET - Student by ID =====
app.get("/students/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid student ID format" });
        }

        const student = await Student.findById(id);
        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }

        res.json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ===== 6. Start Server =====
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
