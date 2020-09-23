import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Transition } from "react-transition-group";

import Card from "./Card";

export const Board = ({ questions, answers, setAnswers, type, secImg }) => {
    const [flip, setFlip] = useState(false);
    const history = useHistory();
    const { index } = useParams();
    let questionIndex = index ? index - 1 : 0;
    console.log(answers);

    const doAnswer = answer => {
        console.log(answer);
        const newAnswers = answers.slice().map((current, i) => current + answer[i]); // 合計値,回答の配列をインデックス毎に足す
        setAnswers(newAnswers);
        setFlip(!flip);
        const path = index < questions.length
            ? `/${type}/questions/${parseInt(index, 10) + 1}` : type === "values" ? "/personality/top" : "/form"
        history.push(path);
    };

    const choices_count = type === "values" ? 4 : 2;

    const buttons = [...Array(choices_count).keys()].map(i => {
        const vAnswer = [...Array(answers.length).keys()].map(n => n === i ? 1 : 0);
        const pAnswer = questions[questionIndex][`count${i === 0 ? 'A' : 'B'}`].split("").map(n => parseInt(n, 10));
        const answer = type === "values" ? vAnswer : pAnswer;
        return (
            <p
                onClick={() => doAnswer(answer)} key={i}
                className="btn"
            >
                {questions[questionIndex][`choice${i + 1}`]}
            </p>
        )
    });

    const secTop = type === "values" ? secImg["values"]: secImg["personality"];

    return (
        <>
            <h1>
                <img
                    src={secTop.path}
                    alt={secTop.alt}
                    className="sectop-img"
                />
            </h1>
            <Transition
                in={flip}
                timeout={550}
            >{state => (
                <Card
                    state={state}
                    index={index}
                    questionIndex={questionIndex}
                    buttons={buttons}
                    questions={questions}
                />
            )}
            </Transition>
        </>
    );
};

export default Board;