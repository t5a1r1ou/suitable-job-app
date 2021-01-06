import React, { createContext, useState } from "react";
import Constants from "../Constants";
const { questionsLen, answersLen } = Constants;

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

export const vQuestionsContext = createContext(
  {} as {
    vQuestions: questionItems[];
    setvQuestions: React.Dispatch<React.SetStateAction<questionItems[]>>;
  }
);

export const pQuestionsContext = createContext(
  {} as {
    pQuestions: questionItems[];
    setpQuestions: React.Dispatch<React.SetStateAction<questionItems[]>>;
  }
);

export const vAnswersContext = createContext(
  {} as {
    vAnswers: number[][];
    setvAnswers: React.Dispatch<React.SetStateAction<number[][]>>;
  }
);

export const pAnswersContext = createContext(
  {} as {
    pAnswers: number[][];
    setpAnswers: React.Dispatch<React.SetStateAction<number[][]>>;
  }
);

const VQuestionsProvider = (props: { children: React.ReactNode }) => {
  const [vQuestions, setvQuestions] = useState<questionItems[]>([]);

  return (
    <vQuestionsContext.Provider value={{ vQuestions, setvQuestions }}>
      {props.children}
    </vQuestionsContext.Provider>
  );
};

const PQuestionsProvider = (props: { children: React.ReactNode }) => {
  const [pQuestions, setpQuestions] = useState<questionItems[]>([]);

  return (
    <pQuestionsContext.Provider value={{ pQuestions, setpQuestions }}>
      {props.children}
    </pQuestionsContext.Provider>
  );
};

const VAnswersProvider = (props: { children: React.ReactNode }) => {
  const [vAnswers, setvAnswers] = useState<number[][]>(
    Array(questionsLen["vQuestions"]).fill(
      Array(answersLen["vQuestions"]).fill(0)
    )
  );

  return (
    <vAnswersContext.Provider value={{ vAnswers, setvAnswers }}>
      {props.children}
    </vAnswersContext.Provider>
  );
};

const PAnswersProvider = (props: { children: React.ReactNode }) => {
  const [pAnswers, setpAnswers] = useState<number[][]>(
    Array(questionsLen["pQuestions"]).fill(
      Array(answersLen["pQuestions"]).fill(0)
    )
  );

  return (
    <pAnswersContext.Provider value={{ pAnswers, setpAnswers }}>
      {props.children}
    </pAnswersContext.Provider>
  );
};

const AppContext = (props: { children: React.ReactNode }) => {
  return (
    <VQuestionsProvider>
      <PQuestionsProvider>
        <VAnswersProvider>
          <PAnswersProvider>{props.children}</PAnswersProvider>
        </VAnswersProvider>
      </PQuestionsProvider>
    </VQuestionsProvider>
  );
};

export default AppContext;
