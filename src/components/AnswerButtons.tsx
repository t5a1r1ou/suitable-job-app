import React, { memo } from "react";
import Constants from "../Constants";
import AnswerButton from "./AnswerButton";

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
  const { optionsLen } = Constants;

  const answerLen =
    type === "values" ? optionsLen["vQuestions"] : optionsLen["pQuestions"];
  const answers = [...Array(answerLen).keys()].map((index) => {
    const answer =
      type === "values"
        ? [...Array(optionsLen["vQuestions"]).keys()].map((n) =>
            n === index ? 1 : 0
          )
        : thisQuestion[`count${index === 0 ? "A" : "B"}`]
            .split("")
            .map((n: string) => parseInt(n, 10));
    return { index: index, answer: answer };
  });

  return (
    <div className="btn_box">
      {answers.map((obj) => (
        <AnswerButton
          answer={obj.answer}
          index={obj.index}
          thisQuestion={thisQuestion}
          key={obj.index}
          type={type}
        />
      ))}
    </div>
  );
});

export default AnswerButtons;
