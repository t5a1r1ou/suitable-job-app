import React, { memo, useContext } from "react";
import { answersContext } from "../contexts/AppContext";

import CardImg from "./CardImg";
import AnswerButtons from "./AnswerButtons";

const FLIP_STYLE = {
  // 前面⇒背面
  entering: {
    transition: "all .5s ease",
    transform: "perspective(25rem) rotateY(360deg)",
  },
  // 背面
  entered: {
    transition: "",
    transform: "perspective(25rem) rotateY(0deg)",
  },
  // 背面⇒前面
  exiting: {
    transition: "all .5s ease",
    transform: "perspective(25rem) rotateY(360deg)",
  },
  // 前面
  exited: {
    transition: "",
    transform: "perspective(25rem) rotateY(0)",
  },
};

const FLIP_BACK_STYLE = {
  // 前面⇒背面
  entering: {
    transition: "all .5s ease",
    transform: "perspective(25rem) rotateY(-360deg)",
  },
  // 背面
  entered: {
    transition: "",
    transform: "perspective(25rem) rotateY(0deg)",
  },
  // 背面⇒前面
  exiting: {
    transition: "all .5s ease",
    transform: "perspective(25rem) rotateY(-360deg)",
  },
  // 前面
  exited: {
    transition: "",
    transform: "perspective(25rem) rotateY(0)",
  },
};

interface questionsItems {
  title: string;
  image_url?: string;
  countA: string;
  countB: string;
  choice1: string;
  choice2: string;
  choice3?: string;
  choice4?: string;
}

interface Props {
  state: string;
  index: string;
  type: string;
  thisQuestion: questionsItems;
}

const Card: React.FC<Props> = memo(({ state, index, type, thisQuestion }) => {
  const { answersState } = useContext(answersContext);
  const { flipFlag } = answersState;
  return (
    <div
      className="flip-card"
      style={flipFlag ? FLIP_STYLE[state] : FLIP_BACK_STYLE[state]}
    >
      <div className="flip-card_id">
        <em>問{index}</em>
      </div>
      <h2 className="flip-card_title">{thisQuestion.title}</h2>
      {thisQuestion.image_url && <CardImg thisQuestion={thisQuestion} />}
      <AnswerButtons thisQuestion={thisQuestion} type={type} />
    </div>
  );
});

export default Card;
