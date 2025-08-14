import React from "react";
import StudentCard from "./StudentCard";

const StudentList = () => {
  const students = [
    { name: "Sriram", major: "Computer Science", year: "IV" },
    { name: "Swathi", major: "IT", year: "IV" },
    { name: "lokesh", major: "ECE", year: "IV" },
  ];

  

  return (
    <div className="flex flex-wrap gap-4 justify-center p-6">
      {students.map((student, index) => (
        <StudentCard key={index} student={student} />
      ))}
    </div>
  );
};

export default StudentList;