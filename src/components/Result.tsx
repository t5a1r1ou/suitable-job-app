import React, { memo } from "react";
import { Redirect, useHistory } from "react-router-dom";

import TwitterShare from "./TwitterShare";
import PageHeader from "./PageHeader";
import PersonalityResultComp from "./PersonalityResultComp";
import ValuesResultComp from "./ValuesResultComp";

import Constants from "../Constants";

interface ValueResult {
  id: number;
  type: string;
  desc: string;
  importance: string;
}

interface PersonalityResult {
  id: number;
  arr: number[];
  desc: string;
  type: string;
}

interface Props {
  validAnswers: boolean;
  setpAnswers: React.Dispatch<React.SetStateAction<any[]>>;
  setvAnswers: React.Dispatch<React.SetStateAction<any[]>>;
  resultTop: string;
  valuesResult: ValueResult;
  personalityResult: PersonalityResult;
}

const Result: React.FC<Props> = memo(
  ({
    validAnswers,
    setpAnswers,
    setvAnswers,
    resultTop,
    valuesResult,
    personalityResult,
  }) => {
    const { questionsLen, answersLen } = Constants;
    const history = useHistory();
    const backTop = () => {
      setvAnswers(
        Array(questionsLen["vQuestions"]).fill(
          Array(answersLen["vQuestions"]).fill(0)
        )
      );
      setpAnswers(
        Array(questionsLen["pQuestions"]).fill(
          Array(answersLen["pQuestions"]).fill(0)
        )
      );
      history.push("/");
    };

    return !validAnswers ? (
      <>
        <PageHeader title="診断結果" />
        <h1>
          <img src={resultTop} alt="診断結果" className="sectop-result" />
        </h1>
        <div className="result-box">
          <ValuesResultComp results={valuesResult} />
          <PersonalityResultComp results={personalityResult} />
        </div>
        <p onClick={() => backTop()} className="btn">
          トップへ
        </p>
        <TwitterShare
          valuesResult={valuesResult}
          personalityResult={personalityResult}
        />
        <a
          className="btn-em mb2"
          href="https://www.717450.net/"
          target="_blank"
          rel="noopener noreferrer"
        >
          工場求人ナビトップに戻る
        </a>
      </>
    ) : (
      <Redirect to="/" />
    );
  }
);

export default Result;
