import React, { memo } from "react";

interface Results {
  id: number;
  arr?: number[];
  type: string;
  desc: string;
}

interface Props {
  results: Results | undefined;
  type: string;
}

const ResultComp: React.FC<Props> = memo(({ results, type }) => {
  return (
    <>
      <h2 className="result-top">
        {type === "values" ? "価値観" : "性格"}診断テスト結果
      </h2>
      <p className="result-you">あなたは…</p>
      <p className="result-type">
        {results ? `${results["type"]}タイプ！` : "...now loading"}
      </p>
      <p className="result-desc">
        {results ? `${results["desc"]}タイプ！` : "...now loading"}
      </p>
    </>
  );
});

export default ResultComp;
