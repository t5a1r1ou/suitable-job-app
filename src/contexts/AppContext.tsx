import React, { createContext, useReducer } from "react";
import Constants from "../Constants";

const { questionsLen, answersLen } = Constants;

interface questionItem {
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

interface questionsObj {
  vQuestions: questionItem[];
  pQuestions: questionItem[];
}

interface AnswersState {
  vAnswers: any[];
  pAnswers: any[];
  flip: boolean;
  flipBack: boolean;
  flipFlag: boolean;
}

type FetchAction = {
  type: "FETCH_QUESTIONS";
  payload: questionItem[];
  which: string;
};

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

export const questionsContext = createContext(
  {} as {
    questionsState: questionsObj;
    dispatch: React.Dispatch<FetchAction>;
  }
);

export const answersContext = createContext(
  {} as {
    answersState: AnswersState;
    dispatch: React.Dispatch<AnswerAction>;
  }
);

const questionsInitialState: questionsObj = {
  vQuestions: [],
  pQuestions: [],
};

const questionsFetchReducer = (
  questionsState: questionsObj,
  action: FetchAction
) => {
  switch (action.type) {
    case "FETCH_QUESTIONS": {
      const { payload, which } = action;
      return which === "values"
        ? { ...questionsState, vQuestions: payload }
        : { ...questionsState, pQuestions: payload };
    }
    default:
      return questionsState;
  }
};

const QuestionsProvider = (props: { children: React.ReactNode }) => {
  const [questionsState, dispatch] = useReducer(
    questionsFetchReducer,
    questionsInitialState
  );

  return (
    <questionsContext.Provider value={{ questionsState, dispatch }}>
      {props.children}
    </questionsContext.Provider>
  );
};

const answersInitialState = {
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

const answersCalculateReducer = (
  answersState: AnswersState,
  action: AnswerAction
) => {
  switch (action.type) {
    case "ANSWER_QUESTION": {
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
    case "ANSWER_BACK": {
      const { flipBack } = answersState;
      return {
        ...answersState,
        flipFlag: false,
        flipBack: !flipBack,
      };
    }
    case "ANSWER_RESET":
      return answersInitialState;
    default:
      return answersInitialState;
  }
};

const AnswersProvider = (props: { children: React.ReactNode }) => {
  const [answersState, dispatch] = useReducer(
    answersCalculateReducer,
    answersInitialState
  );

  return (
    <answersContext.Provider value={{ answersState, dispatch }}>
      {props.children}
    </answersContext.Provider>
  );
};

export const AppProvider = (props: { children: React.ReactNode }) => {
  return (
    <AnswersProvider>
      <QuestionsProvider>{props.children}</QuestionsProvider>
    </AnswersProvider>
  );
};
