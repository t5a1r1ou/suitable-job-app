import { useContext } from "react";
import { questionsContext } from "../contexts/AppContext";
import Constants from "../Constants";
import useQuestionsCollect from "./useQuestionsCollect";

interface secTop {
  title: string;
  titleAlt: string;
  doc: string;
  docAlt: string;
}

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
  const questionsLength =
    type === "values" ? questionsLen["vQuestions"] : questionsLen["pQuestions"];

  const questions = type === "values" ? vQuestions : pQuestions;
  const secTop: secTop =
    type === "values" ? secImg["values"] : secImg["personality"];

  const pageTitle: string = type === "values" ? "価値観" : "性格";

  return { questionsLength, questions, secTop, pageTitle };
};

export default useWhichQuestions;
