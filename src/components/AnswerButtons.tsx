import React, { memo } from "react";
import AnswerButton from "./AnswerButton";
import useCalcAnswerCount from "../logic/useCalcAnswerCount";

interface thisquestionItems {
  [key: string]: string;
}

interface Props {
  thisQuestion: thisquestionItems;
  type: string;
}

const AnswerButtons: React.FC<Props> = memo(({ thisQuestion, type }) => {
  const answers = useCalcAnswerCount(type, thisQuestion);
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
