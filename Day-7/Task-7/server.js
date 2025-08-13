const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb+srv://sriramvenkatesan2005:sriram12345@cluster0.jfi8dso.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Student Schema
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
  age: { type: Number, required: true, min: 5, max: 100 },
  major: { type: String, required: true, minlength: 3 },
  rollNo: { type: String, required: true, unique: true }
});

const Student = mongoose.model("Student", studentSchema);

// 📌 GET /students with Pagination
app.get("/students", async (req, res) => {
  try {
    let { page = 1, pageSize = 5 } = req.query;

    page = parseInt(page);
    pageSize = parseInt(pageSize);

    if (page < 1 || pageSize < 1) {
      return res.status(400).json({ error: "page and pageSize must be positive integers" });
    }

    const totalStudents = await Student.countDocuments();
    const totalPages = Math.ceil(totalStudents / pageSize);

    const students = await Student.find()
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.json({
      totalStudents,
      totalPages,
      currentPage: page,
      pageSize,
      students
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
