import { useEffect, useState, useContext } from "react";
import { questionsContext } from "../contexts/AppContext";
import axios from "axios";

const useQuestionsCollect = () => {
  const { dispatch } = useContext(questionsContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const getvQuestions = async () => {
      setIsLoading(true);
      await axios
        .get(process.env.REACT_APP_SJC_VQUESTIONS as string)
        .then((r) => {
          dispatch({
            type: "FETCH_QUESTIONS",
            payload: r.data.data,
            which: "values",
          });
          setIsLoading(false);
        })
        .catch(() => {
          setIsError(true);
        });
    };

    const getpQuestions = async () => {
      setIsLoading(true);
      await axios
        .get(process.env.REACT_APP_SJC_PQUESTIONS as string)
        .then((r) => {
          dispatch({
            type: "FETCH_QUESTIONS",
            payload: r.data.data,
            which: "personality",
          });
          setIsLoading(false);
        })
        .catch(() => {
          setIsError(true);
        });
    };

    getvQuestions();
    getpQuestions();
  }, [dispatch]);

  return { isLoading, isError };
};

export default useQuestionsCollect;
