import React from "react";

const CardImg = ({ thisQuestion }) => {
  const { image_url } = thisQuestion;
  return (
    <div className="card-imgbox">
      <img
        src={`https://www.717450.net/priority/sjc_img/${image_url}`}
        alt=""
      />
    </div>
  );
};

export default CardImg;
