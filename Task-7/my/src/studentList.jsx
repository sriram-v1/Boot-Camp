import React, { useState } from "react";
import './StudentList.css'

const StudentList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Sample student data
  const students = [
    "Sriram",
    "Venkatesan",
    "Sathiya",
    "Srimathi",
    "Swathi",
    "Swatha",
    "Lokesh",
    "Balaji"
    
  ];

  // Filter students based on search input
  const filteredStudents = students.filter((student) =>
    student.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="student-list-container">
      <h2>Searchable Student List</h2>
      <input
        type="text"
        placeholder="Search students..."
        className="search-bar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul className="student-list">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student, index) => (
            <li key={index} className="student-item">
              {student}
            </li>
          ))
        ) : (
          <li className="no-results">No students found</li>
        )}
      </ul>
    </div>
  );
};

export default StudentList;