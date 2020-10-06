import React, { memo } from "react";

interface questionsItems {
  title: string;
}

interface Props {
  questions: questionsItems[];
  questionIndex: number;
  type: string;
  doAnswer: (answer: number[]) => void;
}

const AnswerButtons: React.FC<Props> = memo(
  ({ questions, questionIndex, type, doAnswer }) => {
    const choices_count = type === "values" ? 4 : 2;
    const answers = [...Array(choices_count).keys()].map((i) => {
      const vAnswer = [...Array(choices_count).keys()].map((n) =>
        n === i ? 1 : 0
      );
      const pAnswer = questions[questionIndex][`count${i === 0 ? "A" : "B"}`]
        .split("")
        .map((n: string) => parseInt(n, 10));
      const answer = type === "values" ? vAnswer : pAnswer;
      return { index: i, answer: answer };
    });
    return (
      <>
        {answers.map((obj) => (
          <p
            onClick={() => doAnswer(obj.answer)}
            key={obj.index}
            className="btn"
          >
            {questions[questionIndex][`choice${obj.index + 1}`]}
          </p>
        ))}
      </>
    );
  }
);

export default AnswerButtons;
