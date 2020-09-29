import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Transition } from "react-transition-group";

import Card from "./Card";
import ProgressBar from "./ProgressBar";
import PageHeader from "./PageHeader";

export const Board = ({ questions, answers, setAnswers, type, secImg }) => {
    const [flip, setFlip] = useState(false);
    const [flipBack, setFlipBack] = useState(false);
    const [flipFlag, setFlipFlag] = useState(true);
    const history = useHistory();
    const { index } = useParams();
    const questionIndex = index ? index - 1 : questions.length - 1;
    const questionProgress = index ? index - 1 : questions.length;

    const doAnswer = answer => {
        const newAnswers = answers.slice();
        newAnswers[questionIndex] = answer;
        setAnswers(newAnswers);
        setFlipFlag(true);
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

    const doBack = () => {
        setFlipFlag(false);
        setFlipBack(!flipBack);
        history.push(`/${type}/questions/${questionIndex}`);
    }

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
                in={flipFlag ? flip : flipBack}
                timeout={550}
            >{state => (
                <Card
                    state={state}
                    flipFlag={flipFlag}
                    index={index}
                    type={type}
                    questionIndex={questionIndex}
                    questions={questions}
                    doAnswer={doAnswer}
                />
            )}
            </Transition>
            {index !== "1" &&
            <p
                className="btn_back"
                onClick={() => doBack()}
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