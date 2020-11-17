import React, { memo } from "react";
import { Redirect, useHistory } from "react-router-dom";

import TwitterShare from "./TwitterShare";
import PageHeader from "./PageHeader";
import PersonalityResultComp from "./PersonalityResultComp";
import ValuesResultComp from "./ValuesResultComp";

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

    const maxIndex: (arr: number[][]) => number = (arr) => {
      const sumArr = arr.reduce((acc, current) =>
        acc.map((a, i) => a + current[i])
      );
      const max = sumArr.reduce((a, b) => Math.max(a, b));
      const targetArr: number[] = [];
      sumArr.forEach((a, index) => {
        if (a === max) {
          targetArr.push(index);
        }
      });

      const [targetFirst] = targetArr;
      return targetArr.length === 1
        ? targetFirst
        : targetArr[Math.floor(Math.random() * targetArr.length)];
    };

    const sortedIndexs: (arr: number[][]) => number[] = (arr) => {
      let sumArr: number[] = arr.reduce((acc, current) =>
        acc.map((a, i) => a + current[i])
      );
      const targetArr: number[] = [];
      for (let n = 0; n < sumArr.length; n++) {
        const max: number = sumArr.reduce((a, b) => Math.max(a, b));
        const index: number = sumArr.findIndex((a) => a === max);
        targetArr.push(index);
        const tempArr: number[] = sumArr.slice();
        tempArr[index] = 0;
        sumArr = tempArr;
      }
      return targetArr;
    };

    const personalityMax: number[] = sortedIndexs(pAnswers)
      .slice(0, 2)
      .sort((a, b) => a - b); // 順番無視するためにソート

    const valuesResult = valuesResults[maxIndex(vAnswers)];

    const personalityResult = personalityResults.find((result) => {
      const array_equal = (a: number[], b: number[]) => {
        if (a.length !== b.length) return false;
        for (let i = 0, n = a.length; i < n; ++i) {
          if (a[i] !== b[i]) return false;
        }
        return true;
      };
      return array_equal(result["arr"], personalityMax);
    });

    console.log(personalityResult);

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
      </>
    ) : (
      <Redirect to="/" />
    );
  }
);

export default Result;
