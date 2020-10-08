import React, { useState } from "react";
import { useHistory } from "react-router-dom";

interface Props {
  docWaiting: string;
  docWaited: string;
}

const WaitResult: React.FC<Props> = ({ docWaiting, docWaited }) => {
  const history = useHistory();
  const [complete, setComplete] = useState(false);
  const waitObj = {
    waiting: {
      img: docWaiting,
      alt: "結果計算中の博士",
      text: "結果計算中…",
    },
    waited: {
      img: docWaited,
      alt: "結果計算完了の博士",
      text: "結果計算完了！",
    },
  };
  const wait = complete ? waitObj["waited"] : waitObj["waiting"];
  setTimeout(() => {
    setComplete(true);
  }, 2000);
  setTimeout(() => history.push("/result"), 3000);

  return (
    <div className="wait_box">
      <h1 className="wait_text">{wait.text}</h1>
      <img src={wait.img} alt={wait.alt} className="wait_doc" />
    </div>
  );
};

export default WaitResult;
