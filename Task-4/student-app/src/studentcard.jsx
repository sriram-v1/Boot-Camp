import React from "react";

const StudentCard = ({ name, major, year }) => {
  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
      <p className="text-gray-600 mt-2">Major: <span className="font-medium">{major}</span></p>
      <p className="text-gray-600 mt-1">Year: <span className="font-medium">{year}</span></p>
    </div>
  );
};

export default StudentCard;