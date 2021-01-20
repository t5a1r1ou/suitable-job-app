import React, { memo } from "react";
import { useHistory } from "react-router-dom";
import useQuestionsCollect from "../logic/useQuestionsCollect";

const StartButton = memo(() => {
  const history = useHistory();
  const { isLoading, isError } = useQuestionsCollect();

  return (
    <>
      {isError ? (
        <p>{"エラーが発生しています。\n再読み込みをしてください。"}</p>
      ) : isLoading ? (
        <p>ロード中。。。</p>
      ) : (
        <p className="btn-start" onClick={() => history.push("/values/top")}>
          始める
        </p>
      )}
    </>
  );
});

export default StartButton;
