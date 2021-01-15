import React from "react";

const CardTitle = ({ title, index }) => {
  return (
    <>
      <div className="flip-card_id">
        <em>問{index}</em>
      </div>
      <h2 className="flip-card_title">{title}</h2>
    </>
  );
};

export default CardTitle;
