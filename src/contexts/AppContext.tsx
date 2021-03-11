import React, { createContext, useReducer } from "react";
import {
  questionsInitialState,
  questionsFetchReducer,
} from "../reducers/questionsFetch";
import {
  answersCalculateReducer,
  answersInitialState,
} from "../reducers/answersCalculate";

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

interface PropsChildren {
  children: React.ReactNode;
}

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

const QuestionsProvider: React.FC<PropsChildren> = (props) => {
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

const AnswersProvider: React.FC<PropsChildren> = (props) => {
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

export const AppProvider: React.FC<PropsChildren> = (props) => {
  return (
    <AnswersProvider>
      <QuestionsProvider>{props.children}</QuestionsProvider>
    </AnswersProvider>
  );
};
