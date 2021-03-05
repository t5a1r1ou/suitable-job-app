import { useEffect, useState, useContext } from "react";
import { questionsContext } from "../contexts/AppContext";
import axios from "axios";

const useQuestionsCollect = () => {
  const { dispatch } = useContext(questionsContext);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  useEffect(() => {
    const getQuestions = async () => {
      setLoading(true);
      await axios
        .get(process.env.REACT_APP_QUESTIONS_JSON as string)
        .then((r) => {
          dispatch({
            type: "FETCH_QUESTIONS",
            payload: r.data.personality,
            which: "personality",
          });
          dispatch({
            type: "FETCH_QUESTIONS",
            payload: r.data.values,
            which: "values",
          });
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setError(true);
        });
    };

    getQuestions();
  }, [dispatch]);

  return { isLoading, isError };
};

export default useQuestionsCollect;
