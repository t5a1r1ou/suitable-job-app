import React, { useState, memo } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Transition } from "react-transition-group";

import Card from "./Card";
import ProgressBar from "./ProgressBar";
import PageHeader from "./PageHeader";

interface questionsItems {
  title: string;
  image_url?: string;
  countA: string;
  countB: string;
  choice1: string;
  choice2: string;
  choice3?: string;
  choice4?: string;
}

interface Props {
  questions: questionsItems[];
  answers: number[][];
  setAnswers: any;
  type: string;
  secImg: {
    values: {
      title: string;
      titleAlt: string;
      doc: string;
      docAlt: string;
    };
    personality: {
      title: string;
      titleAlt: string;
      doc: string;
      docAlt: string;
    };
  };
}

interface RouteParams {
  index: string;
}

interface secTop {
  title: string;
  titleAlt: string;
  doc: string;
  docAlt: string;
}

export const Board: React.FC<Props> = memo(
  ({ questions, answers, setAnswers, type, secImg }) => {
    const [flip, setFlip] = useState(false);
    const [flipBack, setFlipBack] = useState(false);
    const [flipFlag, setFlipFlag] = useState(true);
    const history = useHistory();
    const { index } = useParams<RouteParams>();
    const questionIndex = index
      ? parseInt(index, 10) - 1
      : questions.length - 1;
    const questionProgress = index ? parseInt(index, 10) - 1 : questions.length;

    const doAnswer: (answer: number[]) => void = (answer) => {
      const newAnswers = answers.slice();
      newAnswers[questionIndex] = answer;
      setAnswers(newAnswers);
      setFlipFlag(true);
      setFlip(!flip);

      const path: string = (function () {
        if (parseInt(index, 10) < questions.length) {
          return `/${type}/questions/${parseInt(index, 10) + 1}`;
        } else if (type === "values") {
          return "/personality/top";
        } else {
          return "/form";
        }
      })();
      history.push(path);
    };

    const doBack: () => void = () => {
      setFlipFlag(false);
      setFlipBack(!flipBack);
      history.push(`/${type}/questions/${questionIndex}`);
    };

    const secTop: secTop =
      type === "values" ? secImg["values"] : secImg["personality"];

    const pageTitle: string = type === "values" ? "価値観" : "性格";
    const thisQuestion = questions[questionIndex];
    return (
      <>
        <PageHeader title={`${pageTitle}診断 設問${index}`} />
        <h1>
          <img
            src={secTop.title}
            alt={secTop.titleAlt}
            className="sectop-img"
          />
        </h1>
        <Transition in={flipFlag ? flip : flipBack} timeout={550}>
          {(state: string) => (
            <Card
              state={state}
              flipFlag={flipFlag}
              index={index}
              type={type}
              thisQuestion={thisQuestion}
              doAnswer={doAnswer}
            />
          )}
        </Transition>
        {index !== "1" && (
          <p className="btn_border" onClick={() => doBack()}>
            戻る
          </p>
        )}
        <ProgressBar
          now={questionProgress}
          length={questions.length}
          type={type}
        />
      </>
    );
  }
);

export default Board;
