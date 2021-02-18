import React, { memo, useContext } from "react";
import { useParams } from "react-router-dom";
import { Transition } from "react-transition-group";

import Card from "./Card";
import ProgressBar from "./ProgressBar";
import PageHeader from "./PageHeader";

import { answersContext } from "../contexts/AppContext";
import BackButton from "./BackButton";
import useWhichQuestions from "../logic/useWhichQuestions";

import Constants from "../Constants";

interface Props {
  type: string;
}

interface RouteParams {
  index: string;
}

interface FlipState {
  entering: { transition: string; transform: string };
  entered: { transition: string; transform: string };
  exiting: { transition: string; transform: string };
  exited: { transition: string; transform: string };
}

export const Board: React.FC<Props> = memo(({ type }) => {
  const { answersState } = useContext(answersContext);
  const { flip, flipBack, flipFlag } = answersState;
  const { questionsLength, questions, title, titleSrc } = useWhichQuestions(
    type
  );
  const { index } = useParams<RouteParams>();
  const questionIndex = index ? parseInt(index, 10) - 1 : questionsLength - 1;
  const questionProgress = parseInt(index, 10) - 1;
  const thisQuestion = questions[questionIndex];
  const { FLIP_STYLE, FLIP_BACK_STYLE } = Constants;

  const getFlipStyle = (state: keyof FlipState) => {
    return flipFlag ? FLIP_STYLE[state] : FLIP_BACK_STYLE[state];
  };

  return (
    <>
      <PageHeader title={`${title}診断 設問${index}`} />
      <h1>
        <img src={titleSrc} alt={title} className="sectop-img" />
      </h1>
      <Transition in={flipFlag ? flip : flipBack} timeout={550}>
        {(state: "entering" | "entered" | "exiting" | "exited") => (
          <Card
            style={getFlipStyle(state)}
            index={index}
            type={type}
            // @ts-ignore
            thisQuestion={thisQuestion}
          />
        )}
      </Transition>
      <BackButton index={index} type={type} />
      <ProgressBar
        now={questionProgress}
        length={questionsLength}
        type={type}
      />
    </>
  );
});

export default Board;
