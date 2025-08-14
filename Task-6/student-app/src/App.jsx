import React from "react";
import StudentCard from "./StudentCard";
import "./App.css";

const students = [
  { name: "Sriram", year: "Freshman", major: "Computer Science" },
  { name: "Swathi", year: "Sophomore", major: "Mechanical Engineering" },
  { name: "Swetha", year: "Junior", major: "Fashion Design" },
  { name: "Lokesh", year: "Senior", major: "IT" },
];

const App = () => {
  return (
    <div className="app-container">
      {students.map((student, index) => (
        <StudentCard key={index} {...student} />
      ))}
    </div>
  );
};

export default App;