import { useEffect, useState, useContext } from "react";
import { questionsContext } from "../contexts/AppContext";
import axios from "axios";

const useQuestionsCollect = () => {
  const { dispatch } = useContext(questionsContext);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  useEffect(() => {
    const getvQuestions = async () => {
      setLoading(true);
      await axios
        .get(process.env.REACT_APP_SJC_VQUESTIONS as string)
        .then((r) => {
          dispatch({
            type: "FETCH_QUESTIONS",
            payload: r.data.data,
            which: "values",
          });
          setLoading(false);
        })
        .catch(() => {
          setError(true);
        });
    };

    const getpQuestions = async () => {
      setLoading(true);
      await axios
        .get(process.env.REACT_APP_SJC_PQUESTIONS as string)
        .then((r) => {
          dispatch({
            type: "FETCH_QUESTIONS",
            payload: r.data.data,
            which: "personality",
          });
          setLoading(false);
        })
        .catch(() => {
          setError(true);
        });
    };

    getvQuestions();
    getpQuestions();
  }, [dispatch]);

  return { isLoading, isError };
};

export default useQuestionsCollect;
