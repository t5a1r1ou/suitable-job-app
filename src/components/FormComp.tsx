import React, { memo, useCallback } from "react";
import { Label, Input, Select } from "@rebass/forms";

interface Props {
  sendElements: {
    age: string;
    email: string;
    sex: string;
    job: string;
    wage: string;
    dormitory: boolean;
    answers: number[][];
    result_id: string;
    result_title: string;
  };
  setSendElements: any;
  eachData: {
    label: string;
    labelName: string;
    type: string;
    placeholder: string;
    required: boolean;
    options?: string[];
  };
}

const FormComp: React.FC<Props> = memo(
  ({ sendElements, setSendElements, eachData }) => {
    const { label, labelName, type, placeholder, required, options } = eachData;
    const handleChange = useCallback(
      (e) =>
        setSendElements({ ...sendElements, [e.target.name]: e.target.value }),
      [sendElements, setSendElements]
    );
    return (
      <>
        <Label htmlFor={label}>
          {labelName}
          {required ? "※必須" : "(任意)"}
        </Label>
        {type !== "select" ? (
          <Input
            type={type}
            name={label}
            value={sendElements[label]}
            onChange={(e) => handleChange(e)}
            placeholder={placeholder}
            required={required}
            className="form-elements"
          />
        ) : (
          <Select
            name={label}
            value={sendElements[label]}
            onChange={(e) => handleChange(e)}
            className="form-elements"
          >
            {options && options.map((opt) => <option key={opt}>{opt}</option>)}
          </Select>
        )}
      </>
    );
  }
);

export default FormComp;
