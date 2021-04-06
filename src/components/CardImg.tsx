import React, { memo } from "react";

interface Props {
  image_url: string;
}

const CardImg: React.VFC<Props> = memo(({ image_url }) => {
  return (
    <div className="card-imgbox">
      <img
        src={`https://www.717450.net/priority/sjc_img/${image_url}`}
        alt=""
      />
    </div>
  );
});

export default CardImg;
