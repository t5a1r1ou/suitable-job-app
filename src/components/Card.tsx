import React, { memo } from "react";

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
  image_url: string;
}

interface Props {
  state: string;
  flipFlag: boolean;
  index: string;
  type: string;
  questionIndex: number;
  questions: questionsItems[];
  doAnswer: (answer: number[]) => void;
}

const Card: React.FC<Props> = memo(
  ({ state, flipFlag, index, type, questionIndex, questions, doAnswer }) => {
    return (
      <div
        className="flip-card"
        style={flipFlag ? FLIP_STYLE[state] : FLIP_BACK_STYLE[state]}
      >
        <div className="flip-card_id">
          <em>問{index}</em>
        </div>
        <h2 className="flip-card_title">{questions[questionIndex].title}</h2>
        {type === "personality" && (
          <div className="card-imgbox">
            <img
              src={`https://www.717450.net/priority/sjc_img/${questions[questionIndex].image_url}`}
              alt={questions[questionIndex].title}
            />
          </div>
        )}
        <div className="btn_box">
          <AnswerButtons
            questions={questions}
            questionIndex={questionIndex}
            type={type}
            doAnswer={doAnswer}
          />
        </div>
      </div>
    );
  }
);

export default Card;
