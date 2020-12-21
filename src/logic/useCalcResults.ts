import { useMemo } from "react";
import Constants from "../Constants";

interface ValuesResult {
  id: number;
  type: string;
  importance: string;
  desc: string;
}

type PersonalityResult =
  | {
      id: number;
      arr: number[];
      type: string;
      desc: string;
    }
  | undefined;

export const useCalcResults = (vanswers: number[][], panswers: number[][]) => {
  const { valuesResults, personalityResults } = Constants;

  const valuesResult: ValuesResult = useMemo(() => {
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

    return valuesResults[maxIndex(vanswers)];
  }, [valuesResults, vanswers]);

  const personalityResult: PersonalityResult = useMemo(
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
        const personalityMax: number[] = sortedIndexs(panswers)
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
    [personalityResults, panswers]
  );

  return [valuesResult, personalityResult];
};