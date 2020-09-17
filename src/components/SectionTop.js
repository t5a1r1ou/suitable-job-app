import React from "react";
import { useHistory } from "react-router-dom";
import Typewriter from "typewriter-effect";
import Constants from "../Constants";

const SectionTop = ({type, secImg}) => {
    const { sectionTexts } = Constants;
    const history = useHistory();
    const secTop = type === "values" ? secImg["values"]: secImg["personality"];
    const imgIndex = type === "values" ? "1": "2";
    const texts = type === "values" ? sectionTexts["values"] : sectionTexts["personality"];
    const test_start = () => history.push(`/${type}/questions/1`);
    return (
        <>
            <h1>
                <img
                    src={secTop.path}
                    alt={secTop.alt}
                    className="sectop-img"
                />
            </h1>
            <div className="sectop-box">
                <div className="sectop-dia">
                    <p className="sectop-name">Dr.Nisso</p>
                    <Typewriter
                        onInit={writer => writer.typeString(texts).start()}
                        options={{
                            delay: 70
                        }}
                        className="sectop-text"
                    />
                </div>
                <img
                    src={`${process.env.PUBLIC_URL}/doctor${imgIndex}.png`}
                    alt="博士"
                    className="sectop-doc"
                />
            </div>
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