import React from "react";
import useAnswerCalc from "../logic/useAnswerCalc";

interface thisquestionItems {
  [index: string]: string;
}

interface Props {
  answer: number[];
  index: number;
  thisQuestion: thisquestionItems;
  type: string;
}

const AnswerButton: React.VFC<Props> = ({
  answer,
  index,
  thisQuestion,
  type,
}) => {
  const { doAnswer } = useAnswerCalc();
  return (
    <p
      onClick={() => doAnswer(answer, type)}
      key={index}
      className="btn-answer"
    >
      {thisQuestion[`choice${index + 1}`]}
    </p>
  );
};

export default AnswerButton;
