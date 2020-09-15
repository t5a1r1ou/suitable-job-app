import React from "react";

import { useHistory } from "react-router-dom";

const Form = () => {
    const history = useHistory();
    return (
        <>
            <h1>Form</h1>
            <p
                className="btn"
                onClick={() => history.push("/result")}
            >
                結果へ
            </p>
        </>
    );
};

export default Form;