import React from "react";
import "./StudentCard.css";

const yearColors = {
  Freshman: "black",
  Sophomore: "blue",
  Junior: "pink",
  Senior: "red",
};

const StudentCard = ({ name, year, major }) => {
  return (
    <div className="student-card" style={{ backgroundColor: yearColors[year] || "gray" }}>
      <h2>{name}</h2>
      <p><strong>Year:</strong> {year}</p>
      <p><strong>Major:</strong> {major}</p>
    </div>
  );
};

export default StudentCard;