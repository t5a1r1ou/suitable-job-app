import React, { memo, useState, useCallback } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { Label, Radio } from "@rebass/forms";

import useCalcResults from "../logic/useCalcResults";

import FormComp from "./FormComp";
import PageHeader from "./PageHeader";
import Constants from "../Constants";

interface SendElements {
  age: string;
  sex: string;
  area: string;
  status: string;
  distance: string;
  importance: string;
  values_result: any;
  personality_result: any;
}

const Form: React.VFC = memo(() => {
  const { valuesResult, personalityResult, validAnswers } = useCalcResults();
  const { formElements } = Constants;
  const [alertState, setAlertState] = useState({
    alertAge: false,
    alertMinus: false,
    alertArea: false,
  });
  const [sendElements, setSendElements] = useState({
    age: "",
    sex: "男",
    area: "-",
    status: "就業中",
    distance: "-",
    importance: "-",
    values_result: valuesResult.type,
    personality_result: personalityResult.type,
  });

  const handleChange = useCallback(
    (e) =>
      setSendElements({ ...sendElements, [e.target.name]: e.target.value }),
    [sendElements, setSendElements]
  );

  const history = useHistory();

  const checkAge = () => {
    if (parseInt(sendElements.age, 10) < 0) {
      setAlertState({ ...alertState, alertAge: false, alertMinus: true });
      return false;
    } else if (sendElements.age === "") {
      setAlertState({ ...alertState, alertAge: true, alertMinus: false });
      return false;
    } else {
      setAlertState({ ...alertState, alertAge: false, alertMinus: false });
      return true;
    }
  };

  const checkArea = () => {
    if (sendElements.area === "-") {
      setAlertState({ ...alertState, alertArea: true });
      return false;
    } else {
      setAlertState({ ...alertState, alertArea: false });
      return true;
    }
  };

  const canSubmit = () => {
    const validAge = checkAge();
    const vlidArea = checkArea();
    return validAge && vlidArea;
  };

  const sendForm = () => {
    return canSubmit() && history.push("/loading");
  };

  const { alertAge, alertArea, alertMinus } = alertState;

  return !validAnswers ? (
    <>
      <PageHeader title="アンケート" />
      <h1 className="form-title">アンケート</h1>
      <div className="form-box">
        {formElements.map((ele) => (
          <FormComp
            sendElements={sendElements}
            eachData={ele}
            key={ele.label}
            handleChange={handleChange}
          />
        ))}
        <div className="form-radiobox">
          <Label>
            <Radio
              name="status"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e)
              }
              value="就業中"
              checked
            />
            就業中
          </Label>
          <Label>
            <Radio
              name="status"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e)
              }
              value="離職中"
            />
            離職中
          </Label>
        </div>
      </div>
      {alertAge && <p className="form-alert">年齢を入力してください</p>}
      {alertMinus && <p className="form-alert">年齢の入力に誤りがあります</p>}
      {alertArea && <p className="form-alert">都道府県を選択してください</p>}
      <button className="btn-em" onClick={() => sendForm()}>
        結果へ
      </button>
    </>
  ) : (
    <Redirect to="/" />
  );
});

export default Form;
