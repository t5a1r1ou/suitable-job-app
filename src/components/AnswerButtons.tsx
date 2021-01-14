import React, { memo } from "react";
import useAnswerCalc from "../logic/useAnswerCalc";
import Constants from "../Constants";

interface questionsItems {
  countA: string;
  countB: string;
  choice1: string;
  choice2: string;
  choice3?: string;
  choice4?: string;
}

interface Props {
  thisQuestion: questionsItems;
  type: string;
}

const AnswerButtons: React.FC<Props> = memo(({ thisQuestion, type }) => {
  const { doAnswer } = useAnswerCalc();
  const { optionsLen } = Constants;

  const answers = [
    ...Array(
      type === "values" ? optionsLen["vQuestions"] : optionsLen["pQuestions"]
    ).keys(),
  ].map((i) => {
    const answer =
      type === "values"
        ? [...Array(type === "values" ? 4 : 2).keys()].map((n) =>
            n === i ? 1 : 0
          )
        : thisQuestion[`count${i === 0 ? "A" : "B"}`]
            .split("")
            .map((n: string) => parseInt(n, 10));
    return { index: i, answer: answer };
  });

  return (
    <>
      {answers.map((obj) => (
        <p
          onClick={() => doAnswer(obj.answer, type)}
          key={obj.index}
          className="btn-answer"
        >
          {thisQuestion[`choice${obj.index + 1}`]}
        </p>
      ))}
    </>
  );
});

export default AnswerButtons;
