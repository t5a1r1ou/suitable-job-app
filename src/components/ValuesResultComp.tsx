import React, { memo } from "react";

interface Results {
  id: number;
  arr?: number[];
  desc: string;
}

interface Props {
  results: Results | undefined;
}

const ValuesResultComp: React.FC<Props> = memo(({ results }) => {
  return (
    <>
      <h2 className="result-top">価値観診断テスト結果</h2>
      <p className="result-text">あなたは…</p>
      <p className="result-type">
        {results ? results["type"] : "...now loading"}
      </p>
      <p className="result-text">中でもあなたが最も大切にしているのは</p>
      <p className="result-importance">
        {results ? results["importance"] : "...now loading"}
      </p>
      <p className="result-desc">
        {results ? results["desc"] : "...now loading"}
      </p>
    </>
  );
});

export default ValuesResultComp;
