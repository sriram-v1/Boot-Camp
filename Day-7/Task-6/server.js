// server.js
const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json()); // Parse JSON body

// ===== Connect to MongoDB =====
mongoose.connect("mongodb+srv://sriramvenkatesan2005:sriram12345@cluster0.jfi8dso.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// ===== Student Schema with Validation =====
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "Name must be at least 3 characters"],
        maxlength: [50, "Name must be less than 50 characters"]
    },
    age: {
        type: Number,
        required: [true, "Age is required"],
        min: [5, "Age must be at least 5"],
        max: [100, "Age must be less than 100"]
    },
    major: {
        type: String,
        required: [true, "Major is required"],
        minlength: [2, "Major must be at least 2 characters"],
        maxlength: [50, "Major must be less than 50 characters"]
    },
    rollNo: {
        type: String,
        required: [true, "Roll Number is required"],
        unique: true,
        minlength: [1, "Roll Number must be at least 1 character"],
        maxlength: [20, "Roll Number must be less than 20 characters"]
    }
});

const Student = mongoose.model("Student", studentSchema);

// ===== CREATE (POST) =====
app.post("/students", async (req, res) => {
    try {
        const { name, age, major, rollNo } = req.body;

        // Manual validation for empty fields
        if (!name || !age || !major || !rollNo) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check for duplicate rollNo
        const existingStudent = await Student.findOne({ rollNo });
        if (existingStudent) {
            return res.status(400).json({ error: "Roll Number already exists" });
        }

        const student = new Student({ name, age, major, rollNo });
        await student.save();

        res.status(201).json({ message: "Student created successfully", studentId: student._id });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// ===== READ ALL (GET) =====
app.get("/students", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ===== READ BY ID (GET) =====
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

// ===== UPDATE (PUT) =====
app.put("/students/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, age, major, rollNo } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid student ID format" });
        }

        // Manual required fields check
        if (!name || !age || !major || !rollNo) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check for duplicate rollNo in another student
        const existingStudent = await Student.findOne({ rollNo, _id: { $ne: id } });
        if (existingStudent) {
            return res.status(400).json({ error: "Roll Number already exists" });
        }

        const updatedStudent = await Student.findByIdAndUpdate(
            id,
            { name, age, major, rollNo },
            { new: true, runValidators: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({ error: "Student not found" });
        }

        res.json({ message: "Student updated successfully", updatedStudent });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// ===== DELETE (DELETE) =====
app.delete("/students/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid student ID format" });
        }

        const deletedStudent = await Student.findByIdAndDelete(id);

        if (!deletedStudent) {
            return res.status(404).json({ error: "Student not found" });
        }

        res.json({ message: "Student deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ===== Start Server =====
app.listen(3000, () => {
    console.log("🚀 Server is running on port 3000");
});
