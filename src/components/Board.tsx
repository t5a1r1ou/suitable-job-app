import React, { memo, useContext } from "react";
import { useParams } from "react-router-dom";
import { Transition } from "react-transition-group";

import Card from "./Card";
import ProgressBar from "./ProgressBar";
import PageHeader from "./PageHeader";

import { answersContext } from "../contexts/AppContext";
import BackButton from "./BackButton";
import useWhichQuestions from "../logic/useWhichQuestions";

interface Props {
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

export const Board: React.FC<Props> = memo(({ type, secImg }) => {
  const { answersState } = useContext(answersContext);
  const { flip, flipBack, flipFlag } = answersState;
  const { questionsLength, questions, secTop, pageTitle } = useWhichQuestions(
    type,
    secImg
  );
  const { index } = useParams<RouteParams>();
  const questionIndex = index ? parseInt(index, 10) - 1 : questionsLength - 1;
  const questionProgress = parseInt(index, 10) - 1;
  const thisQuestion = questions[questionIndex];

  return (
    <>
      <PageHeader title={`${pageTitle}診断 設問${index}`} />
      <h1>
        <img src={secTop.title} alt={secTop.titleAlt} className="sectop-img" />
      </h1>
      <Transition in={flipFlag ? flip : flipBack} timeout={550}>
        {(state: string) => (
          <Card
            state={state}
            index={index}
            type={type}
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
