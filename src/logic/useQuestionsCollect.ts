import { useEffect, useState, useContext } from "react";
import { questionsContext } from "../contexts/AppContext";
import axios from "axios";

const useQuestionsCollect = () => {
  const { dispatch } = useContext(questionsContext);
  const [loadingState, setloadingState] = useState({
    isLoading: false,
    isError: false,
  });
  useEffect(() => {
    const getvQuestions = async () => {
      setloadingState({ ...loadingState, isLoading: true });
      await axios
        .get(process.env.REACT_APP_SJC_VQUESTIONS as string)
        .then((r) => {
          dispatch({
            type: "FETCH_QUESTIONS",
            payload: r.data.data,
            which: "values",
          });
          setloadingState({ ...loadingState, isLoading: false });
        })
        .catch(() => {
          setloadingState({ ...loadingState, isError: true });
        });
    };

    const getpQuestions = async () => {
      setloadingState({ ...loadingState, isLoading: true });
      await axios
        .get(process.env.REACT_APP_SJC_PQUESTIONS as string)
        .then((r) => {
          dispatch({
            type: "FETCH_QUESTIONS",
            payload: r.data.data,
            which: "personality",
          });
          setloadingState({ ...loadingState, isLoading: false });
        })
        .catch(() => {
          setloadingState({ ...loadingState, isError: true });
        });
    };

    getvQuestions();
    getpQuestions();
  }, [dispatch]);

  return loadingState;
};

export default useQuestionsCollect;
