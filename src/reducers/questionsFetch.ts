import { FETCH_QUESTIONS } from "../actions";

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

type FetchAction = {
  type: "FETCH_QUESTIONS";
  payload: questionItem[];
  which: string;
};

export const questionsInitialState: questionsObj = {
  vQuestions: [],
  pQuestions: [],
};

export const questionsFetchReducer = (
  questionsState: questionsObj,
  action: FetchAction
) => {
  switch (action.type) {
    case FETCH_QUESTIONS: {
      const { payload, which } = action;
      return which === "values"
        ? { ...questionsState, vQuestions: payload }
        : { ...questionsState, pQuestions: payload };
    }
    default:
      return questionsState;
  }
};
