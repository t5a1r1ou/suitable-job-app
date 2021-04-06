import React, { memo } from "react";

interface Results {
  id: number;
  desc: string;
  importance?: string;
  type: string;
}

interface Props {
  results: Results;
}

const ValuesResultComp: React.VFC<Props> = memo(({ results }) => {
  return (
    <>
      <h2 className="result-top">価値観診断テスト結果</h2>
      <p className="result-text">あなたは…</p>
      <p className="result-type">
        {results ? `${results["type"]}タイプ！` : "...now loading"}
      </p>
      <p className="result-text">あなたの長所は…</p>
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
