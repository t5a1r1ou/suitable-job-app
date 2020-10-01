import React from "react";
import { Redirect, useHistory } from "react-router-dom";

import PageHeader from "./PageHeader";


interface Props {
  vAnswers: number[][];
  pAnswers: number[][];
  setpAnswers: React.Dispatch<React.SetStateAction<any[]>>;
  setvAnswers: React.Dispatch<React.SetStateAction<any[]>>;
  checkAnswers: (answers: number[][]) => boolean;
}

const Result:React.FC<Props> = ({vAnswers, pAnswers, setpAnswers, setvAnswers, checkAnswers}) => {
    const validAnswers = checkAnswers(vAnswers);
    const history = useHistory();
    const backTop = () => {
        history.push("/");
        setvAnswers(Array(5).fill([0,0,0,0]));
        setpAnswers(Array(25).fill([0,0,0,0,0,0]));
    };

    const maxIndexs = arr => {
        const sumArr = arr.reduce((acc, current) => {
            return acc.map((a, i) => a + current[i]);
        });
        const max = sumArr.reduce((a, b) => Math.max(a, b));
        const targetArr: number[] = [];
        sumArr.forEach((a, index) => {
          if (a === max) {
            targetArr.push(index);
          };
        });
        return targetArr;
      };
    
      const valuesMax = maxIndexs(vAnswers);
      const personalityMax = maxIndexs(pAnswers);
    

    const MaxTitle = max => max.length === 1 ? max[0] + 1 : max.join("・");
    
    return (!validAnswers ?
        <>
            <PageHeader title="診断結果" />
            <h1>診断結果</h1>
            <p>価値観診断テスト結果：{MaxTitle(valuesMax)}タイプ</p>
            <p>性格診断テスト結果：{MaxTitle(personalityMax)}タイプ</p>
            <p 
                onClick={() => backTop()}
                className="btn"
            >トップへ</p>
        </>
        :<Redirect to="/" />);
};

export default Result;