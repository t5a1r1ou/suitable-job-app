import { useContext } from "react";
import { questionsContext } from "../contexts/AppContext";
import Constants from "../Constants";

import valuesImg from "../images/values.png";
import personalityImg from "../images/personality.png";
import docValues from "../images/doctor1.png";
import docPersonality from "../images/doctor2.png";

const useWhichQuestions = (type: string) => {
  const { questionsState } = useContext(questionsContext);
  const { vQuestions, pQuestions } = questionsState;
  const { questionsLen, sectionTexts } = Constants;

  const questionObj = {
    values: {
      questionsLength: questionsLen["vQuestions"],
      questions: vQuestions,
      title: "価値観診断テスト",
      titleSrc: valuesImg,
      doc: docValues,
      docAlt: "博士（価値観）",
      sectionText: sectionTexts["values"],
    },
    personality: {
      questionsLength: questionsLen["pQuestions"],
      questions: pQuestions,
      title: "性格診断テスト",
      titleSrc: personalityImg,
      doc: docPersonality,
      docAlt: "博士（性格）",
      sectionText: sectionTexts["personality"],
    },
  };

  return questionObj[type];
};

export default useWhichQuestions;
