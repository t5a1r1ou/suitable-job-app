import React, { memo } from "react";

import CardImg from "./CardImg";
import AnswerButtons from "./AnswerButtons";

interface thisquestionItems {
  [index: string]: string;
}

interface Props {
  style: React.CSSProperties;
  index: string;
  type: string;
  thisQuestion: thisquestionItems;
}

const Card: React.FC<Props> = memo(({ style, index, type, thisQuestion }) => {
  return (
    <div className="flip-card" style={style}>
      <div className="flip-card_id">
        <em>問{index}</em>
      </div>
      <h2 className="flip-card_title">{thisQuestion.title}</h2>
      {thisQuestion.image_url && <CardImg image_url={thisQuestion.image_url} />}
      <AnswerButtons thisQuestion={thisQuestion} type={type} />
    </div>
  );
});

export default Card;
