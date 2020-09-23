import React, { useState } from "react";

import { Redirect, useHistory } from "react-router-dom";
import { Label, Checkbox } from '@rebass/forms';

import FormComp from "./FormComp";
import Constants from "../Constants";

const Form = ({answers}) => {
    const checkAnswers = answers.every(ele => ele === 0);
    const { formElements } = Constants;
    const [alertText, setAlertText] = useState(false);
    const [sendElements, setSendElements] = useState({
        age: "",
        email: "",
        sex: "男",
        job: "",
        wage: "",
        dormitory: false,
        answers: "",
        result_id: "",
        result_title: ""
    });

    const handleChecked = e => setSendElements({ ...sendElements, [e.target.name]: e.target.checked });

    const history = useHistory();

    const canSubmit = () => sendElements.age !== "";

    const submitAct = () => {
        console.log(sendElements);
        history.push("/result");
    };

    const sendForm = () => canSubmit() ? submitAct() : setAlertText(true);

    return (!checkAnswers ?
        <>
            <h1>アンケート</h1>
            <div className="form-box">
                {formElements.map(ele => (
                    <FormComp
                        sendElements={sendElements}
                        setSendElements={setSendElements}
                        eachData={ele}
                        key={ele.label}
                    />
                ))}
                <Label>
                <Checkbox
                    name='domitory'
                    onChange={e => handleChecked(e)}
                    className="form-elements"
                />
                寮付きのお仕事希望
                </Label>

            </div>
            {alertText && (
                <p className="form-alert">年齢を入力してください</p>
            )}
            <button
                className="btn"
                disabled={!canSubmit()}
                onClick={() => sendForm()}
            >
                結果へ
            </button>
        </> : <Redirect to="/" />
    );
};

export default Form;