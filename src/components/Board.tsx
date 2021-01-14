import React, { memo, useContext } from "react";
import { useParams } from "react-router-dom";
import { Transition } from "react-transition-group";

import Card from "./Card";
import ProgressBar from "./ProgressBar";
import PageHeader from "./PageHeader";

import { answersContext, questionsContext } from "../contexts/AppContext";
import BackButton from "./BackButton";
import Constants from "../Constants";

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

interface secTop {
  title: string;
  titleAlt: string;
  doc: string;
  docAlt: string;
}

export const Board: React.FC<Props> = memo(({ type, secImg }) => {
  const { questionsState } = useContext(questionsContext);
  const { answersState } = useContext(answersContext);

  const { vQuestions, pQuestions } = questionsState;
  const { flip, flipBack, flipFlag } = answersState;

  const { questionsLen } = Constants;
  const questionsLength =
    type === "values" ? questionsLen["vQuestions"] : questionsLen["pQuestions"];

  const questions = type === "values" ? vQuestions : pQuestions;
  const secTop: secTop =
    type === "values" ? secImg["values"] : secImg["personality"];

  const pageTitle: string = type === "values" ? "価値観" : "性格";

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
