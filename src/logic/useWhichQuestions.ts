import { useContext } from "react";
import { questionsContext } from "../contexts/AppContext";
import Constants from "../Constants";

interface secImg {
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
}

const useWhichQuestions = (type: string, secImg: secImg) => {
  const { questionsState } = useContext(questionsContext);
  const { vQuestions, pQuestions } = questionsState;
  const { questionsLen } = Constants;

  const questionObj = {
    values: {
      questionsLength: questionsLen["vQuestions"],
      questions: vQuestions,
      secTop: secImg["values"],
      pageTitle: "価値観",
    },
    personality: {
      questionsLength: questionsLen["pQuestions"],
      questions: pQuestions,
      secTop: secImg["personality"],
      pageTitle: "性格",
    },
  };

  const whichQuestions = questionObj[type];

  return whichQuestions;
};

export default useWhichQuestions;
