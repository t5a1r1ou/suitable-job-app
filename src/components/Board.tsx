import React, { useState, memo } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Transition } from "react-transition-group";
import loadable from "@loadable/component";

const Card = loadable(() => import("./Card"));
const ProgressBar = loadable(() => import("./ProgressBar"));
const PageHeader = loadable(() => import("./PageHeader"));

interface questionsItems {
  title: string;
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
        //   const path: string = (function (answers: number[][]) {
        // const sumArr: number[] = answers.reduce((acc, curr) =>
        //   acc.map((a, i) => a + curr[i])
        // );
        // const max: number = sumArr.reduce((a, b) => Math.max(a, b));
        // const checkAnswer: boolean =
        //   sumArr.filter((a) => a === max).length >= 2; // 最大値を取る項目が2つ以上
        if (parseInt(index, 10) < questions.length) {
          return `/${type}/questions/${parseInt(index, 10) + 1}`;
          // } else if (checkAnswer) {
          //   return `/${type}/questions/extra/1`;
        } else if (type === "values") {
          return "/personality/top";
        } else {
          return "/form";
        }
        //   })(answers);
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
              questionIndex={questionIndex}
              questions={questions}
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
