import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Transition } from "react-transition-group";

import Card from "./Card";
import ProgressBar from "./ProgressBar";
import PageHeader from "./PageHeader"

export const Board = ({ questions, answers, setAnswers, type, secImg }) => {
    const [flip, setFlip] = useState(false);
    const history = useHistory();
    const { index } = useParams();
    const questionIndex = index ? index - 1 : questions.length - 1;
    const questionProgress = index ? index - 1 : questions.length;
    console.log(answers);

    const doAnswer = answer => {
        const newAnswers = answers.slice();
        newAnswers[questionIndex] = answer;
        // const newAnswers = answers.slice().map((current, i) => current + answer[i]); // 合計値,回答の配列をインデックス毎に足す
        setAnswers(newAnswers);
        setFlip(!flip);

        const path = (function() {
            if (index < questions.length) {
                return `/${type}/questions/${parseInt(index, 10) + 1}`;
            } else if (type === "values") {
                return "/personality/top";
            } else {
                return "/form";
            };
        }());
        history.push(path);
    };

    const choices_count = type === "values" ? 4 : 2;
    console.log(index);
    console.log(index !== "1");

    const buttons = [...Array(choices_count).keys()].map(i => {
        const vAnswer = [...Array(choices_count).keys()].map(n => n === i ? 1 : 0);
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

    const pageTitle = type === "values" ? "価値観" : "性格";
    return (
        <>  
            <PageHeader title={`${pageTitle}診断 設問${index}`} />
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
            {index !== "1" &&
            <p
                className="btn_back"
                onClick={() => history.push(`/${type}/questions/${questionIndex}`)}
            >
                戻る
            </p>
            }
            <ProgressBar
                now={questionProgress}
                length={questions.length}
                type={type}
            />
        </>
    );
};

export default Board;