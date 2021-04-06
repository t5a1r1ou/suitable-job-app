import React, { memo } from "react";
import { Redirect, useHistory } from "react-router-dom";

import TwitterShare from "./TwitterShare";
import PageHeader from "./PageHeader";
import PersonalityResultComp from "./PersonalityResultComp";
import ValuesResultComp from "./ValuesResultComp";

import useCalcResults from "../logic/useCalcResults";

import resultTop from "../images/result.png";
import useAnswerCalc from "../logic/useAnswerCalc";

interface Result {
  id: number;
  arr?: number[];
  desc: string;
  type: string;
  importance?: string;
}

const Result: React.VFC = memo(() => {
  const history = useHistory();
  const { valuesResult, personalityResult, validAnswers } = useCalcResults();
  const { resetAnswers } = useAnswerCalc();

  console.log(validAnswers);

  if (validAnswers) {
    resetAnswers();
    return <Redirect to="/" />;
  }

  const backTop = () => {
    resetAnswers();
    history.push("/");
  };

  return (
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
  );
});

export default Result;
