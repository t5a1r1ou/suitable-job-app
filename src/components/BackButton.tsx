import React from "react";
import useAnswerCalc from "../logic/useAnswerCalc";

interface Props {
  visible: boolean;
  type: string;
}

const BackButton: React.VFC<Props> = ({ visible, type }) => {
  const { doBack } = useAnswerCalc();

  return (
    <>
      {visible && (
        <p className="btn_border" onClick={() => doBack(type)}>
          戻る
        </p>
      )}
    </>
  );
};

export default BackButton;
