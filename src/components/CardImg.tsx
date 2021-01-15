import React from "react";

const CardImg = ({ thisQuestion }) => {
  return (
    <div className="card-imgbox">
      <img
        src={`https://www.717450.net/priority/sjc_img/${thisQuestion.image_url}`}
        alt={thisQuestion.title}
      />
    </div>
  );
};

export default CardImg;
