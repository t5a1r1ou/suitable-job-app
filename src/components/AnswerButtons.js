import React from "react";

const AnswerButtons = ({questions, questionIndex, type, doAnswer}) => {
    const choices_count = type === "values" ? 4 : 2;
    const buttons = [...Array(choices_count).keys()].map(i => {
        const vAnswer = [...Array(choices_count).keys()].map(n => n === i ? 1 : 0);
        const pAnswer = questions[questionIndex][`count${i === 0 ? 'A' : 'B'}`].split("").map(n => parseInt(n, 10));
        const answer = type === "values" ? vAnswer : pAnswer;
        return (
            <p
                onClick={() => doAnswer(answer)}
                key={i}
                className="btn"
            >
                {questions[questionIndex][`choice${i + 1}`]}
            </p>
        )
    });
    return buttons;
};

export default AnswerButtons;