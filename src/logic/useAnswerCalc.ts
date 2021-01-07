import { useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { answersContext } from "../contexts/AppContext";
import Constants from "../Constants";

interface RouteParams {
  index: string;
}

const useAnswerCalc = (type: string) => {
  const { questionsLen } = Constants;
  const questionsLength =
    type === "values" ? questionsLen["vQuestions"] : questionsLen["pQuestions"];
  const { index } = useParams<RouteParams>();
  const questionIndex = index ? parseInt(index, 10) - 1 : questionsLength - 1;
  const { dispatch } = useContext(answersContext);
  const history = useHistory();

  const doAnswer: (answer: number[]) => void = (answer) => {
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
        return "/form";
      }
    })();
    history.push(path);
  };

  const doBack: () => void = () => {
    dispatch({ type: "ANSWER_BACK" });
    history.push(
      `/${type}/questions/${
        index ? parseInt(index, 10) - 1 : questionsLength - 1
      }`
    );
  };

  return { doAnswer, doBack };
};

export default useAnswerCalc;
