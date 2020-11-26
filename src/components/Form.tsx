import React, { memo, useState, useCallback } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { Label, Radio } from "@rebass/forms";
import axios from "axios";

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
    const [alertAge, setAlertAge] = useState(false);
    const [alertArea, setAlertArea] = useState(false);
    const [sendElements, setSendElements] = useState({
      age: "",
      email: "",
      sex: "男",
      area: "-",
      status: "就業中",
      distance: "-",
      importance: "-",
      valuesResult: valuesResult.type,
      valuesDesc: valuesResult.desc,
      valuesImportance: valuesResult.importance,
      personalityResult: personalityResult.type,
      personalityDesc: personalityResult.desc,
    });

    const handleChange = useCallback(
      (e) =>
        setSendElements({ ...sendElements, [e.target.name]: e.target.value }),
      [sendElements, setSendElements]
    );

    const history = useHistory();

    const submitAct = (data) => {
      history.push("/loading");
      axios
        .post(process.env.REACT_APP_SJC_RESULTS as string, data)
        .then((res) => {
          console.log(res.data.data);
        })
        .catch((err) => {
          alert("送信に失敗しました");
          console.log(err);
        });
    };

    const sendForm = () => {
      if (sendElements.age === "" && sendElements.area === "-") {
        setAlertAge(true);
        setAlertArea(true);
      } else if (sendElements.age === "") {
        setAlertAge(true);
        setAlertArea(false);
      } else if (sendElements.area === "-") {
        setAlertAge(false);
        setAlertArea(true);
      } else {
        submitAct(sendElements);
      }
    };

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
        {alertArea && <p className="form-alert">都道府県を選択してください</p>}
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
