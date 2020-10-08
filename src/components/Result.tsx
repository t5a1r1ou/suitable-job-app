import React, { memo } from "react";
import { Redirect, useHistory } from "react-router-dom";

import TwitterShare from "./TwitterShare";
import PageHeader from "./PageHeader";

import Constants from "../Constants";

interface Props {
  vAnswers: number[][];
  pAnswers: number[][];
  setpAnswers: React.Dispatch<React.SetStateAction<any[]>>;
  setvAnswers: React.Dispatch<React.SetStateAction<any[]>>;
  checkAnswers: (answers: number[][]) => boolean;
  resultTop: string;
}

const Result: React.FC<Props> = memo(
  ({
    vAnswers,
    pAnswers,
    setpAnswers,
    setvAnswers,
    checkAnswers,
    resultTop,
  }) => {
    const {
      questionsLen,
      answersLen,
      valuesResults,
      personalityResults,
    } = Constants;
    const validAnswers = checkAnswers(vAnswers);
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

    const maxIndexs: (arr: number[][]) => number[] = (arr) => {
      const sumArr = arr.reduce((acc, current) =>
        acc.map((a, i) => a + current[i])
      );
      const max = sumArr.reduce((a, b) => Math.max(a, b));
      const targetArr: number[] = [];
      sumArr.forEach((a, index) => {
        if (a === max) {
          targetArr.push(index + 1);
        }
      });
      return targetArr;
    };

    const valuesMax = maxIndexs(vAnswers);
    const personalityMax = maxIndexs(pAnswers);

    const MaxTitle: (max: number[]) => number = (max) =>
      max.length === 1 ? max[0] : max[Math.floor(Math.random() * max.length)];
    const valuesResult = valuesResults[MaxTitle(valuesMax) - 1];
    const personalityResult = personalityResults[MaxTitle(personalityMax) - 1];

    return !validAnswers ? (
      <>
        <PageHeader title="診断結果" />
        <h1>
          <img src={resultTop} alt="診断結果" className="sectop-result" />
        </h1>
        <div className="result-box">
          <h2 className="result-top">価値観診断テスト結果</h2>
          <p className="result-you">あなたは…</p>
          <p className="result-type">{valuesResult["type"]}タイプ！</p>
          <p className="result-desc">{valuesResult["desc"]}</p>
          <h2 className="result-top">性格診断テスト結果</h2>
          <p className="result-you">あなたは…</p>
          <p className="result-type">{personalityResult["type"]}タイプ！</p>
          <p className="result-desc">{personalityResult["desc"]}</p>
        </div>
        <p onClick={() => backTop()} className="btn">
          トップへ
        </p>
        <TwitterShare
          valuesResult={valuesResult}
          personalityResult={personalityResult}
        />
      </>
    ) : (
      <Redirect to="/" />
    );
  }
);

export default Result;
