import { useMemo, useContext } from "react";
import Constants from "../Constants";
import { answersContext } from "../contexts/AppContext";

type Result =
  | {
      id: number;
      arr?: number[];
      type: string;
      desc: string;
      importance?: string;
    }
  | undefined;

const useCalcResults = () => {
  const { answersState } = useContext(answersContext);
  const { vAnswers, pAnswers } = answersState;
  const { valuesResults, personalityResults } = Constants;

  const valuesResult: Result = useMemo(() => {
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

    return valuesResults[maxIndex(vAnswers)];
  }, [valuesResults, vAnswers]);

  const personalityResult: Result = useMemo(
    () =>
      personalityResults.find((result) => {
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
        const array_equal = (a: number[], b: number[]) => {
          if (a.length !== b.length) return false;
          for (let i = 0, n = a.length; i < n; ++i) {
            if (a[i] !== b[i]) return false;
          }
          return true;
        };
        return array_equal(result["arr"], personalityMax);
      }),
    [personalityResults, pAnswers]
  );

  const validAnswers = ((answers: number[][]) => {
    return answers.every((arr) => arr.every((ele: number) => ele === 0));
  })([...pAnswers, ...vAnswers]);

  return { valuesResult, personalityResult, validAnswers };
};

export default useCalcResults;
