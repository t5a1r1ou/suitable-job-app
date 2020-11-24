import React, { memo } from "react";
import { Label, Input, Select } from "@rebass/forms";

interface Props {
  sendElements: {
    age: string;
    email: string;
    sex: string;
    area: string;
    status: string;
    answers: number[][];
    result_id: string;
    result_title: string;
  };
  eachData: {
    label: string;
    labelName: string;
    type: string;
    placeholder: string;
    required: boolean;
    options?: string[];
  };
  handleChange: (e: any) => void;
}

const FormComp: React.FC<Props> = memo(
  ({ sendElements, eachData, handleChange }) => {
    const { label, labelName, type, placeholder, required, options } = eachData;
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
