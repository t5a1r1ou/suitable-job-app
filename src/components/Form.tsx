import React, { memo, useState, useCallback } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { Label, Radio } from "@rebass/forms";

import FormComp from "./FormComp";
import PageHeader from "./PageHeader";
import Constants from "../Constants";

interface Props {
  validAnswers: boolean;
  valuesResult: any;
  personalityResult: any;
}

const Form: React.FC<Props> = memo(
  ({ validAnswers, valuesResult, personalityResult }) => {
    const { formElements } = Constants;
    const [alertText, setAlertText] = useState(false);
    const [sendElements, setSendElements] = useState({
      age: "",
      email: "",
      sex: "男",
      area: "北海道",
      status: "就業中",
      distance: "-",
      importance: "-",
      valuesResult: valuesResult,
      personalityResult: personalityResult,
    });

    console.log(valuesResult);
    console.log(personalityResult);

    const handleChange = useCallback(
      (e) =>
        setSendElements({ ...sendElements, [e.target.name]: e.target.value }),
      [sendElements, setSendElements]
    );

    const history = useHistory();

    const submitAct = () => {
      history.push("/loading");
    };

    const sendForm = () =>
      sendElements.age !== "" ? submitAct() : setAlertText(true);

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
        {alertText && <p className="form-alert">年齢を入力してください</p>}
        <button className="btn-em" onClick={() => sendForm()}>
          結果へ
        </button>
      </>
    ) : (
      <Redirect to="/" />
    );
  }
);

export default Form;
