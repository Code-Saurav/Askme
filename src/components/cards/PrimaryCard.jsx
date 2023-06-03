import React from "react";
import { useNavigate } from "react-router-dom";

const PrimaryCard = ({ cardName, cardDetails, work }) => {
  return (
    <button className="main-card" onClick={work}>
      <h2 className="card-title"> {cardName} </h2>
      <p className="card-details"> {cardDetails}</p>
    </button>
  );
};

export default PrimaryCard;
