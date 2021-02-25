import Constants from "../Constants";

interface questionItem {
  [index: string]: string;
}

const useCalcAnswerCount = (type: string, thisQuestion: questionItem) => {
  const { optionsLen } = Constants;
  const answerLen =
    type === "values" ? optionsLen["vQuestions"] : optionsLen["pQuestions"];
  const answers = [...Array(answerLen).keys()].map((index) => {
    const answer =
      type === "values"
        ? [...Array(optionsLen["vQuestions"]).keys()].map((n) =>
            n === index ? 1 : 0
          )
        : thisQuestion[`count${index === 0 ? "A" : "B"}`]
            .split("")
            .map((n: string) => parseInt(n, 10));
    return { index: index, answer: answer };
  });
  return answers;
};

export default useCalcAnswerCount;
