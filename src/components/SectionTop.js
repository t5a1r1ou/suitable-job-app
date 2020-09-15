import React from "react";
import { useHistory } from "react-router-dom";
import Constants from "../Constants";

const SectionTop = ({type, secImg}) => {
    const { sectionTexts } = Constants;
    const history = useHistory();
    console.log(secImg);
    const secTop = type === "values" ? secImg["values"]: secImg["personality"];
    
    const texts = type === "values" ? sectionTexts["values"] : sectionTexts["personality"];
    const test_start = () => history.push(`/${type}/questions/1`);
    return (
        <>
            <h1>
                <img
                    src={secTop.path}
                    alt={secTop.alt}
                    className="sec-img"
                />
            </h1>
            <p>{texts.body}</p>
            <p 
                onClick={() => test_start()}
                className="btn"
            >
                始める
            </p>
        </>
    )
};

export default SectionTop;