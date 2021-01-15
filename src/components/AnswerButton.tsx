import React from "react";
import useAnswerCalc from "../logic/useAnswerCalc";

const AnswerButton = ({ answer, index, thisQuestion, type }) => {
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
