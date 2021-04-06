import { useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { answersContext } from "../contexts/AppContext";
import Constants from "../Constants";

interface RouteParams {
  index: string;
}

const useAnswerCalc = () => {
  const { questionsLen } = Constants;
  const { index } = useParams<RouteParams>();
  const { dispatch } = useContext(answersContext);
  const history = useHistory();

  const questionsLengthCalc = (type: string) => {
    return type === "values"
      ? questionsLen["vQuestions"]
      : questionsLen["pQuestions"];
  };

  const doAnswer: (answer: number[], type: string) => void = (answer, type) => {
    const questionsLength = questionsLengthCalc(type);
    const questionIndex = index ? parseInt(index, 10) - 1 : questionsLength - 1;
    dispatch({
      type: "ANSWER_QUESTION",
      index: questionIndex,
      which: type,
      answer: answer,
    });
    const path: string = (function () {
      if (parseInt(index, 10) < questionsLength) {
        return `/${type}/questions/${parseInt(index, 10) + 1}`;
      } else if (type === "values") {
        return "/personality/top";
      } else {
        return "/loading";
      }
    })();
    history.push(path);
  };

  const doBack: (type: string) => void = (type) => {
    const questionsLength = questionsLengthCalc(type);
    dispatch({ type: "ANSWER_BACK" });
    history.push(
      `/${type}/questions/${
        index ? parseInt(index, 10) - 1 : questionsLength - 1
      }`
    );
  };

  const resetAnswers: () => void = () => {
    dispatch({ type: "ANSWER_RESET" });
  };

  return { doAnswer, doBack, resetAnswers };
};

export default useAnswerCalc;
