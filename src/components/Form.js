import React, { useState } from "react";

import { Redirect, useHistory } from "react-router-dom";
import {
    Label,
    Input,
    Select,
    Checkbox,
  } from '@rebass/forms'
import Constants from "../Constants";

const Form = ({answers}) => {
    const checkAnswers = answers.every(ele => ele === 0);
    const { wages, genders } = Constants;
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

    const handleChange = e => setSendElements({...sendElements, [e.target.name]: e.target.value});
    const handleChecked = e => setSendElements({ ...sendElements, [e.target.name]: e.target.checked });

    const history = useHistory();

    const canSubmit = () => {
        const validAge = sendElements.age !== "";
        const validSex = sendElements.sex !== "";
        return validAge && validSex;
    };

    // return ( !checkAnswers ?
    return (
        <>
            <h1>アンケート</h1>
            <div className="form-box">
                <Label htmlFor='age'>年齢※必須</Label>
                <Input
                    type="number"
                    name='age'
                    value={sendElements["age"]}
                    onChange={e => handleChange(e)}
                    required
                    autoFocus
                    className="form-elements"
                />
                <Label htmlFor='sex'>性別※必須</Label>
                <Select
                    name='sex'
                    value={sendElements["sex"]}
                    onChange={e => handleChange(e)}
                    required
                    className="form-elements"
                    >
                    {genders.map(gender => <option key={gender}>{gender}</option>)}
                    {/* <option>男</option>
                    <option>女</option>
                    <option>答えない</option> */}
                </Select>
                <Label width={[1/2, 1/4]} p={2}>
                <Checkbox
                    name='domitory'
                    onChange={e => handleChecked(e)}
                    className="form-elements"
                />
                寮付きのお仕事希望
                </Label>
                <Label htmlFor='job'>職業（任意）</Label>
                <Input
                    type="text"
                    name='job'
                    value={sendElements["job"]}
                    onChange={e => handleChange(e)}
                    placeholder="現職または直近のご職業をお答えください"
                    className="form-elements"
                />
                <Label htmlFor='wage'>年収（任意）</Label>
                <Select
                    name='wage'
                    value={sendElements["wage"]}
                    onChange={e => handleChecked(e)}
                    placeholder="現職または直近のご年収をお答えください"
                    className="form-elements"
                >
                    {wages.map(wage => <option key={wage}>{wage}</option>)}
                </Select>
                <Label htmlFor='email'>メールアドレス（任意）</Label>
                <Input
                    type="email"
                    name='email'
                    value={sendElements["email"]}
                    onChange={e => handleChange(e)}
                    placeholder="今回の結果を基に厳選したお仕事をメールにてご紹介いたします"
                    className="form-elements"
                />

            </div>
            <button
                className="btn"
                disabled={!canSubmit()}
                onClick={() => history.push("/result")}
            >
                結果へ
            </button>
        {/* </> : <Redirect to="/" /> */}
        </>
    );
};

export default Form;