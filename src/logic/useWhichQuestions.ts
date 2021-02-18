import { useContext } from "react";
import { questionsContext } from "../contexts/AppContext";
import Constants from "../Constants";

import valuesImg from "../images/values.png";
import personalityImg from "../images/personality.png";
import docValues from "../images/doctor1.png";
import docPersonality from "../images/doctor2.png";

interface QuestionObj {
  questionsLength: number;
  questions: questionItems[];
  title: string;
  titleSrc: string;
  doc: string;
  sectionText: string;
}

interface questionItems {
  choice1: string;
  choice2: string;
  choice3: string;
  choice4: string;
  countA: string;
  countB: string;
  id: number;
  image_url?: string;
  title: string;
}

const useWhichQuestions = (type: string) => {
  const { questionsState } = useContext(questionsContext);
  const { vQuestions, pQuestions } = questionsState;
  const { questionsLen, sectionTexts } = Constants;

  const questionObj: { [index: string]: QuestionObj } = {
    values: {
      questionsLength: questionsLen["vQuestions"],
      questions: vQuestions,
      title: "価値観診断テスト",
      titleSrc: valuesImg,
      doc: docValues,
      sectionText: sectionTexts["values"],
    },
    personality: {
      questionsLength: questionsLen["pQuestions"],
      questions: pQuestions,
      title: "性格診断テスト",
      titleSrc: personalityImg,
      doc: docPersonality,
      sectionText: sectionTexts["personality"],
    },
  };

  return questionObj[type];
};

export default useWhichQuestions;
