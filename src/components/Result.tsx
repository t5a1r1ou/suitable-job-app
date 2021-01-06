import React, { memo, useContext } from "react";
import { Redirect, useHistory } from "react-router-dom";

import TwitterShare from "./TwitterShare";
import PageHeader from "./PageHeader";
import PersonalityResultComp from "./PersonalityResultComp";
import ValuesResultComp from "./ValuesResultComp";

import Constants from "../Constants";
import { pAnswersContext, vAnswersContext } from "../contexts/AppContext";

import useCalcResults from "../logic/useCalcResults";

import resultTop from "../images/result.png";

interface Result {
  id: number;
  arr?: number[];
  desc: string;
  type: string;
  importance?: string;
}

const Result: React.FC = memo(() => {
  const { questionsLen, answersLen } = Constants;
  const { pAnswers, setpAnswers } = useContext(pAnswersContext);
  const { vAnswers, setvAnswers } = useContext(vAnswersContext);
  const [valuesResult, personalityResult] = useCalcResults(vAnswers, pAnswers);
  const checkAnswers = (answers: number[][]) => {
    return answers !== [] ? answers[0].every((ele: number) => ele === 0) : [];
  };
  const validAnswers = checkAnswers([...pAnswers, ...vAnswers]);
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
});

export default Result;
