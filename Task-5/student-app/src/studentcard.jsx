import React from "react";

const StudentCard = ({ student }) => {
  return (
    <div className="border rounded-lg shadow-md p-4 bg-white w-64">
      <h2 className="text-xl font-bold">{student.name}</h2>
      <p className="text-gray-600">Major: {student.major}</p>
      <p className="text-gray-500">Year: {student.year}</p>
    </div>
  );
};

export default StudentCard;