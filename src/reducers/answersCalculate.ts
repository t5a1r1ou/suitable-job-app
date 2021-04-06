import Constants from "../Constants";
import { ANSWER_QUESTION, ANSWER_BACK, ANSWER_RESET } from "../actions";

interface AnswersState {
  vAnswers: any[];
  pAnswers: any[];
  flip: boolean;
  flipBack: boolean;
  flipFlag: boolean;
}

type AnswerAction =
  | {
      type: "ANSWER_QUESTION";
      which: string;
      index: number;
      answer: any;
    }
  | {
      type: "ANSWER_BACK";
    }
  | {
      type: "ANSWER_RESET";
    };

const { questionsLen, answersLen } = Constants;

export const answersInitialState = {
  vAnswers: Array(questionsLen["vQuestions"]).fill(
    Array(answersLen["vQuestions"]).fill(0)
  ),
  pAnswers: Array(questionsLen["pQuestions"]).fill(
    Array(answersLen["pQuestions"]).fill(0)
  ),
  flip: false,
  flipBack: false,
  flipFlag: true,
};

export const answersCalculateReducer = (
  answersState: AnswersState,
  action: AnswerAction
) => {
  switch (action.type) {
    case ANSWER_QUESTION: {
      const { vAnswers, pAnswers, flip } = answersState;
      const { index, answer, which } = action;
      const answers = which === "values" ? vAnswers : pAnswers;
      const answerKey = which === "values" ? "vAnswers" : "pAnswers";
      const newAnswers = answers.slice();
      newAnswers[index] = answer;
      return {
        ...answersState,
        [answerKey]: newAnswers,
        flipFlag: true,
        flip: !flip,
      };
    }
    case ANSWER_BACK: {
      const { flipBack } = answersState;
      return {
        ...answersState,
        flipFlag: false,
        flipBack: !flipBack,
      };
    }
    case ANSWER_RESET:
      return answersInitialState;
    default:
      return answersInitialState;
  }
};
