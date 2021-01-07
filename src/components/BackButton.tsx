import React from "react";
import useAnswerCalc from "../logic/useAnswerCalc";

interface Props {
  index: string;
  type: string;
}

const BackButton: React.FC<Props> = ({ index, type }) => {
  const { doBack } = useAnswerCalc(type);

  return (
    <>
      {index !== "1" && (
        <p className="btn_border" onClick={() => doBack()}>
          戻る
        </p>
      )}
    </>
  );
};

export default BackButton;
