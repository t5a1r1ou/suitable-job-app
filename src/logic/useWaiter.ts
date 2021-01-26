import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

interface WaitObj {
  waiting: {
    img: string;
    text: string;
  };
  waited: {
    img: string;
    text: string;
  };
}

const useWaiter = (waitObj: WaitObj) => {
  const history = useHistory();
  const [complete, setComplete] = useState(false);
  const [now, setNow] = useState(0);
  const wait = complete ? waitObj["waited"] : waitObj["waiting"];

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setNow((prevNow) => (prevNow >= 100 ? 100 : prevNow + 20));
    }, 800);
    setTimeout(() => {
      setComplete(true);
    }, 4000);
    setTimeout(() => {
      history.push("/result");
    }, 5000);
    return () => {
      clearInterval(progressTimer);
    };
  }, [history]);

  return { wait, now };
};

export default useWaiter;
