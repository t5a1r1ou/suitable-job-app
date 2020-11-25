import React, { memo } from "react";

interface Results {
  id: number;
  arr: number[];
  desc: string;
}

interface Props {
  results: Results | undefined;
  type: string;
}

const PersonalityResult: React.FC<Props> = memo(({ results }) => {
  return (
    <>
      <h2 className="result-top">性格診断テスト結果</h2>
      <p className="result-you">あなたは…</p>
      <p className="result-type">
        {results ? results["type"] : "...now loading"}
      </p>
      <p className="result-desc">
        {results ? results["desc"] : "...now loading"}
      </p>
    </>
  );
});

export default PersonalityResult;
